import Screen from './screen'
import LedServer from '../led-server'

const 
  screenW=12,
  screenH=12;

let ledServer = null
let screen = null

async function main() {
  screen = new Screen({
      width: screenW,
      height: screenH
  })  
  ledServer = new LedServer(screen)
}

main().then(()=>{
  console.log('done.')
})