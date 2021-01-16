import ws281x from 'rpi-ws281x-native'

export default class Screen {
  set(pos,rgb) {
    let ledIdx = this.ledMap[pos[1]][pos[0]]
    this.leds[ledIdx] = this.rgbToInt(rgb)
  }
  
  refresh() {
    ws281x.render(this.leds)
  }

  rgbToInt(rgb) {
    //GRB
    return (rgb[1] << 16) + (rgb[0] << 8) + (rgb[2]);
  }

  constructor(params) {
    ws281x.init(12*12)
    ws281x.setBrightness(255)
    //ws281x.setBrightness(100)

    this.leds = new Uint32Array(12*12)
    for (let i in this.leds) {
        this.leds[i] = this.rgbToInt([0,0,0])
    }
    
    this.ledMap = [...Array(12)].map(e => Array(12)) //ledMap[y][x]    
    for (let i = 0; i<12; i++) { //i - номер планки
      let invY = !!(i%2)
      for (let j = 0; j<12; j++) { //j - светодиод на планке, в порядке подключения
        let y = invY?(11-j):j
        this.ledMap[y][11-i] = i*12 + j
      }
    }
    //console.log('ledMap',this.ledMap)
    
    ws281x.render(this.leds)
  }
}