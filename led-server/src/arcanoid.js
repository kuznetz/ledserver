import colors from './lib/colors'
const nx=12,ny=12;

function randomInt(max) { return Math.floor(Math.random() * max) };

export default class {
  
  randColor() {
    return colors[randomInt(colors.length)]
  }  

  renderBall(pos,color) {
    let rpos = [
      Math.floor(pos[0]),
      Math.floor(pos[1])
    ]
    this.screen.set(rpos,color)
  }
  
  renderBricks() {
    for (let y=0; y<12; y++) {
      for (let x=0; x<6; x++) {
        let color = this.bricks[y][x]
        color = color?color:[0,0,0]
        this.screen.set([(x*2),y],color)
        this.screen.set([(x*2)+1,y],color)
      }
    }
  }
  
  ballCollide() {
    let rpos = [
      Math.floor(this.pos[0]/2),
      Math.floor(this.pos[1])
    ]
    let color = this.bricks[rpos[1]][rpos[0]]
    if (color) {
      this.bricks[rpos[1]][rpos[0]] = null
      return true
    } else {
      return false
    }
  }
  
  moveBall() {
    this.pos[0] += this.vector[0]
    if (this.pos[0] < 0) {
      this.pos[0] = 0
      this.vector[0] = -this.vector[0]
    }
    if (this.pos[0] >= nx) {
      this.pos[0] = nx-1
      this.vector[0] = -this.vector[0]
    }
    if (this.ballCollide()) {
      this.vector[0] = -this.vector[0]
    }

    this.pos[1] += this.vector[1]
    if (this.pos[1] < 0) {
      this.pos[1] = 0
      this.vector[1] = -this.vector[1]
    }
    if (this.pos[1] >= ny) {
      this.pos[1] = ny-1
      this.vector[1] = -this.vector[1]
    }
    if (this.ballCollide()) {
      this.vector[1] = -this.vector[1]
    }
  }
  
  tick() {
    this.renderBall(this.pos,[0,0,0])
    this.moveBall()
    this.renderBricks()
    this.renderBall(this.pos,[255,255,255])
    this.screen.refresh()
  }

  start() {
    this.interval = setInterval(()=>{ 
      this.tick()
    },100)
    this.endTimeout = setTimeout(()=>{
      this.stop()
      this.onFinish()
    },20000)
    this.tick()
  }

  stop() {
    clearInterval(this.interval)
    clearTimeout(this.endTimeout)
  }

  clear() {
    let a = Math.random()*2*Math.PI
    let v = 0.5+(Math.random()*0.5)
    this.vector = [
      Math.cos(a)*v,
      Math.sin(a)*v
    ]
    this.pos = [5,5]
    
    this.bricks = []
    for (let y=0; y<12; y++) {
      let hasBrick = [0,1,2,9,10,11].indexOf(y) !== -1
      let row = []
      for (let x=0; x<6; x++) {
        row.push( hasBrick?this.randColor():null )
      }
      this.bricks.push(row)
    }
    //console.log('bricks',this.bricks)
  }
  
  constructor(screen) {
    this.screen = screen
    this.interval = null
    this.endTimeout = null
    this.onFinish = ()=>{}
    this.clear()
  }
}