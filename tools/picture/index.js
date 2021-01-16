const fs = require('fs');
const Jimp = require('jimp');

//0xff0000ff
//0xff00ff
//0xffff

function pixelToRGB(px) {
  let rgb = []
  px = px >>> 8
  rgb.push(px & 0xff)
  px = px >>> 8
  rgb.push(px & 0xff)
  px = px >>> 8
  rgb.push(px & 0xff)
  return rgb.reverse()
}

async function run() {
  let image = await Jimp.read("./picture.bmp")
  let imgArr = []
  for (let y=0; y<12; y++) {
    for (let x=0; x<12; x++) {
      let px = (image.getPixelColor(x, y))
      let rgb = pixelToRGB(px)
      console.log(rgb)
      imgArr.push(rgb)
    }
  }
  return imgArr
}



async function main() {
  let result = await run()  
  fs.writeFileSync('picture.js','export default '+JSON.stringify(result))
}

main()
