import Screen from './lib/screen'
import Tetris from './tetris'
import CurTime from './curtime'
import Arcanoid from './arcanoid'
import Picture from './picture'

const 
  screenW=12,
  screenH=12;

function clearScreen() {
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
        screen.set([x,endY],[0,0,0])
      }
      endY++
      screen.refresh()
    },100)
  })
}

let screen = new Screen({
    width: screenW,
    height: screenH
})
let scenes = [
  new Tetris(screen),
  new Arcanoid(screen),  
  new Picture(screen),
  new CurTime(screen),
]
let curScene = 0

async function restart() {
    await clearScreen()
    curScene++
    curScene = curScene % scenes.length
    //console.log('curScene',curScene)
    scenes[curScene].clear()
    scenes[curScene].start()    
}

for (let i in scenes) {
  scenes[i].onFinish = ()=>{ restart() }
}

scenes[curScene].start()