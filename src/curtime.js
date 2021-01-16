import colors from './lib/colors'
import digits from './lib/digits'
import dayjs from 'dayjs'

function randomInt(max) { return Math.floor(Math.random() * max) };

export default class {

  renderDigit(ox,oy,i,color) {
    for (let y=0; y<6; y++) {
      for (let x=0; x<6; x++) {
        if (digits[i][y*6+x]) {
          this.screen.set([ox+x,oy+y],color)
        }
      }
    }
  }
  
  randColor() {
    return colors[randomInt(colors.length)]
  }
  
  render4digit(str) {
    this.renderDigit(0,0,parseInt(str[0]),this.randColor())
    this.renderDigit(6,0,parseInt(str[1]),this.randColor())
    this.renderDigit(0,6,parseInt(str[2]),this.randColor())
    this.renderDigit(6,6,parseInt(str[3]),this.randColor())
    this.screen.refresh()
  }
  
  render() {
    let time = dayjs().format('HHmm')
    //console.log('time',time)
    this.render4digit(time)
  }

  start() {
    this.timeout = setTimeout(()=>{ this.onFinish() },2000)
    this.render()
  }

  stop() {
    clearTimeout(this.timeout)
  }

  clear() {
  }
  
  constructor(screen) {
    this.screen = screen
    this.timeout = null
    this.onFinish = ()=>{}
    this.clear()
  }
}