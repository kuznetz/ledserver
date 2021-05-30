import colors from './lib/colors'
const nx=12,ny=12;

function randomInt(max) { return Math.floor(Math.random() * max) };

export default class {

  randColor() {
    return colors[randomInt(colors.length)]
  }  

  posFromDir(lastPos,dir) {
    return [
        lastPos[0] + ((dir===1)? 1 : (dir===3)?-1 : 0),
        lastPos[1] + ((dir===0)?-1 : (dir===2)? 1 : 0)
    ]
  }

  hasSnake(pos) {
      for (let p of this.snakePos) {
          if (pos[0] === p[0] && pos[1] === p[1]) {
            return true
          }
      }
      return false
  }

  getNewPos(lastPos) {
    //let dir = randomInt(4)
    let dir = 0

    let diff = [
        lastPos[0] - this.foodPos[0],
        lastPos[1] - this.foodPos[1],
    ]
    if (Math.abs(diff[0]) > Math.abs(diff[1])) {
        dir = (diff[0] < 0)?1:3
    } else {
        dir = (diff[1] < 0)?2:0
    }
    //console.log('dir',dir)

    for (let i=0; i<4; i++) {
        let newPos = this.posFromDir(lastPos,dir)
        let isWall = (newPos[0] < 0) || (newPos[0] >= 12) || (newPos[1] < 0) || (newPos[1] >= 12)
        if (!isWall && !this.hasSnake(newPos)) {
            //console.log('dir2',dir)
            return newPos
        }
        dir = (dir+1)%4
    }
    return null
  }

  tick() {
    let lastPos = this.snakePos.slice(-1)[0]
    let newPos = this.getNewPos(lastPos)
    if (newPos === null) {
       this.stop()
       this.onFinish()
       return
    }
    if (newPos[0] === this.foodPos[0] && newPos[1] === this.foodPos[1]) {
      this.snakeLen += 2
      this.changeFoodPos()
    }
    this.clearSnake()
    this.snakePos.push(newPos)
    if (this.snakePos.length > this.snakeLen) {
      this.snakePos.splice(0,1)
    }
    this.renderSnake()
    this.screen.refresh()
  }

  clearSnake() {
    for (let pos of this.snakePos) {
        this.screen.set(pos,[0,0,0])
    }
  }

  renderSnake() {
    let col = 0
    let revSnake = [...this.snakePos].reverse()
    for (let pos of revSnake) {
        this.screen.set(pos,this.snakeColors[col])
        col = (col+1)%this.snakeColors.length
    }
  }

  changeFoodPos() {
    this.foodPos = null
    let correct = false
    while (!correct) {
        this.foodPos = [
            randomInt(12),
            randomInt(12)
        ]
        correct = !this.hasSnake(this.foodPos)
    }
    this.screen.set(this.foodPos,this.foodColor)
  }

  start() {
    this.snakeLen = 10
    this.snakeColors = []
    for (let i=0; i<4; i++) {
        this.snakeColors.push(this.randColor())
    }
    this.snakePos = [
        [ randomInt(12),  randomInt(12) ]
    ]    
    this.foodColor = this.randColor()
    this.foodPos = null
    this.changeFoodPos()
    this.renderSnake()
    this.screen.refresh()

    this.interval = setInterval(()=>{ 
      this.tick()
    },300)
    this.endTimeout = setTimeout(()=>{
      this.stop()
      this.onFinish()
    },30000)
    this.tick()
  }

  stop() {
    clearInterval(this.interval)
    clearTimeout(this.endTimeout)
  }

  clear() {
  }
  
  constructor(screen) {
    this.screen = screen
    this.interval = null
    this.endTimeout = null
    this.snakeLen = null
    this.onFinish = ()=>{}
    this.clear()
  }
}