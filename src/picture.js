import colors from './lib/colors'
import digits from './lib/digits'
import picture from './lib/picture'
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
    let col = [255,255,255]
    this.renderDigit(0,0,parseInt(str[0]),col)
    this.renderDigit(6,0,parseInt(str[1]),col)
    this.renderDigit(0,6,parseInt(str[2]),col)
    this.renderDigit(6,6,parseInt(str[3]),col)
    this.screen.refresh()
  }
  
  renderYear() {
    let time = dayjs().format('YYYY')
    //console.log('time',time)
    this.render4digit(time)
  }
  
  renderPicture() {
    for (let y=0; y<12; y++) {
      for (let x=0; x<12; x++) {
        this.screen.set([x,y],picture[y*12+x])
      }
    }
    this.screen.refresh()
  }  

  start() {
    this.timeout = setTimeout(()=>{ this.onFinish() },2000)
    this.timeout2 = setTimeout(()=>{ this.renderYear() },2000)
    this.renderPicture()
  }

  stop() {
    clearTimeout(this.timeout)
    clearTimeout(this.timeout2)
  }

  clear() {
  }
  
  constructor(screen) {
    this.screen = screen
    this.timeout = null
    this.timeout2 = null
    this.onFinish = ()=>{}
    this.clear()
  }
}