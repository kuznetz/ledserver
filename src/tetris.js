import colors from './lib/colors'
const nx=12,ny=12;

let blockHexes = [
  [0x0F00, 0x2222, 0x00F0, 0x4444], //I
  [0x44C0, 0x8E00, 0x6440, 0x0E20], //r
  [0x4460, 0x0E80, 0xC440, 0x2E00], //L
  [0xCC00, 0xCC00, 0xCC00, 0xCC00], //O
  [0x06C0, 0x8C40, 0x6C00, 0x4620], //S
  [0x0E40, 0x4C40, 0x4E00, 0x4640], //T
  [0x0C60, 0x4C80, 0xC600, 0x2640] //Z
]

function eachblockHex(blockHex, fn) {
  let row = 0, col = 0
  for(let bit = 0x8000 ; bit > 0 ; bit = bit >> 1) {
    if (blockHex & bit) {
      if (fn(col, row) === false) return
    }
    if (++col === 4) {
      col = 0;
      ++row;
    }
  }
}
let blockTypes = blockHexes.map(grp=>grp.map(hex=>{
  let minx=3,maxx=0,miny=3,maxy=0;
  eachblockHex(hex,(x,y)=>{
    minx = (x<minx)?x:minx
    maxx = (x>maxx)?x:maxx
    miny = (y<miny)?y:miny
    maxy = (y>maxy)?y:maxy
  });
  return {
    minx,maxx,miny,maxy,
    startX: -minx,
    startY: -maxy,
    width:  maxx-minx+1,
    hex
  }
}))
//console.log('blockTypes',blockTypes)

function randomInt(max) { return Math.floor(Math.random() * max) };

function eachblock(piece, fn) {
  //console.log(piece)//piece.type.blocks[piece.dir]
  var bit, result, row = 0, col = 0, blocks = piece.type[piece.dir].hex;
  for(bit = 0x8000 ; bit > 0 ; bit = bit >> 1) {
    if (blocks & bit) {
      if (fn(piece.x + col, piece.y + row) === false) return
    }
    if (++col === 4) {
      col = 0;
      ++row;
    }
  }
}

/*
var pieces = [];
function randomPiece() {
  if (pieces.length == 0)
    pieces = [i,i,i,i,j,j,j,j,l,l,l,l,o,o,o,o,s,s,s,s,t,t,t,t,z,z,z,z];
  var type = pieces.splice(random(0, pieces.length-1), 1)[0];
  return { type: type, dir: DIR.UP, x: Math.round(random(0, nx - type.size)), y: 0 };
}
*/

function randomPiece() {
  let result = { 
    type: blockTypes[randomInt(blockTypes.length)], 
    dir: randomInt(4), 
    x: 0, y: 0,
    color: colors[randomInt(colors.length)]
  }
  let width = result.type[result.dir].width
  result.y = result.type[result.dir].startY-1
  result.x = randomInt(nx-width+1) + result.type[result.dir].startX
  return result
}

export default class {
  
  render(piece,clear=false) {
    eachblock(piece,(x,y)=>{
      if (y >= 0) this.screen.set([x,y],clear?[0,0,0]:piece.color)
    })
    this.screen.refresh()
  }
  
  isOccupied(piece,ox=0,oy=0) { //ox-offsetx, oy-offsety
    var result = false
    eachblock(piece, (x, y)=>{
      x += ox; y += oy;
      if (y >= 0) {
        if (x < 0 || x >= nx || y >= ny || this.occupied[y][x]) {
          result = true;
          return false;
        }
      }
    });
    return result;
  }  
  
  tick() {
      //console.log(isOccupied(piece,0,1))
      if (this.isOccupied(this.piece,0,1)) {
        let gameOver = false
        eachblock(this.piece,(x,y)=>{
          if (y < 0) {
            gameOver = true
            return false;
          }
          this.occupied[y][x] = true
        })
        if (gameOver) {
          this.stop()
          this.onFinish()
        } else {
          this.piece = randomPiece()
          this.render(this.piece)
        }
      } else {
        this.render(this.piece,true)
        this.piece.y++
        this.render(this.piece)
      }
  }
  
  start() {
    this.gameInterval = setInterval(()=>{ this.tick() },200)
    this.render(this.piece)
    this.screen.refresh()
  }

  stop() {
    clearInterval(this.gameInterval)
  }

  clear() {
    this.occupied = []
    for (let y=0; y<ny; y++) {
      let row = []
      for (let x=0; x<nx; x++) {
        //this.screen.set([x,y],[0,0,0])
        row.push(false)
      }
      this.occupied.push(row)
    }
    this.piece = randomPiece()
  }
  
  constructor(screen) {
    this.screen = screen
    this.gameInterval = null
    this.piece = null
    this.occupied = null
    this.onFinish = ()=>{}
    this.clear()
  }
}