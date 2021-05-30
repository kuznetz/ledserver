//607497 - Grazhdanka
//http://dataservice.accuweather.com/currentconditions/v1/607497
//apikey - gjvPz6TfHUQ6k4wtWJgawuuDq264YBOU
///currentconditions/v1/607497?apikey=gjvPz6TfHUQ6k4wtWJgawuuDq264YBOU&language=ru-ru

import colors from './lib/colors'
import digits from './lib/digits'
import tempPlus from './lib/temp-plus'
import tempMinus from './lib/temp-minus'
import weather from './lib/weather'

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
  
  renderDigitStr(str) {
    if (str.length == 1) {
        this.renderDigit(3,6,parseInt(str[0]),this.randColor())
    } else {
        this.renderDigit(0,6,parseInt(str[0]),this.randColor())
        this.renderDigit(6,6,parseInt(str[1]),this.randColor())
    }
  }

  renderPicture(picture) {
    for (let y=0; y<6; y++) {
      for (let x=0; x<12; x++) {
        this.screen.set([x,y],picture[y*12+x])
      }
    }
  }  
  
  render() {
    weather.getTemp().then((temp)=>{
        //console.log('temp',temp)
        let pic = temp>0 ? tempPlus : tempMinus
        let tempStr = Math.abs(Math.round(temp)).toFixed(0)
        //console.log('time',time)
        this.renderPicture(pic)
        this.renderDigitStr(tempStr)
        this.screen.refresh()
    })
  }

  start() {
    this.timeout = setTimeout(()=>{ this.onFinish() },8000)
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