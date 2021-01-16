const fs = require('fs');
const Jimp = require('jimp');

async function run(i) {
  let image = await Jimp.read("./"+i+".bmp")
  let imgArr = []
  for (let y=0; y<6; y++) {
    for (let x=0; x<6; x++) {
      let px = image.getPixelColor(x, y) === 0xff
      imgArr.push(px?1:0)
    }
  }
  console.log(imgArr)
  return imgArr
}

async function main() {
  let result = []
  for (let i=0; i<10; i++) {
    let d = await run(i)
    result.push(d)
  }
  fs.writeFileSync('digits.js','export default '+JSON.stringify(result))
}

main()
