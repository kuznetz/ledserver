import Tetris from './tetris'
import CurTime from './curtime'
import Arcanoid from './arcanoid'
import Picture from './picture'

const 
  screenW=12,
  screenH=12;

export default class {
  
  constructor(screen) {
    this.screen = screen
    this.scenes = [
      new Tetris(screen),
      new Arcanoid(screen),  
      new Picture(screen),
      new CurTime(screen),
    ]
    for (let i in this.scenes) {
      this.scenes[i].onFinish = ()=>{ this.restart() }
    }
    this.curScene = 0
    this.scenes[this.curScene].start()
  }
  
  clearScreen() {
    return new Promise((resolve, reject) => {
      let endY = 0;  
      let endInterval = setInterval(()=>{
        //all clear
        if (endY >= screenH) {
          clearInterval(endInterval)
          setTimeout(()=>{
            resolve()
          },100)
          return;
        }
        //clear line
        for (let x=0; x<screenW; x++) {
          this.screen.set([x,endY],[0,0,0])
        }
        endY++
        this.screen.refresh()
      },100)
    })
  }
  
  async restart() {
      await this.clearScreen()
      this.curScene++
      this.curScene = this.curScene % this.scenes.length
      //console.log('curScene',curScene)
      this.scenes[this.curScene].clear()
      this.scenes[this.curScene].start()    
  }  

}