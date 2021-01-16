export default class {
  set(pos,rgb) {
    this.data[pos[1]][pos[0]] = [...rgb]
  }

  refresh() {
    for (let i=0; i<12; i++) {
      for (let j=0; j<12; j++) {
        let rgb = this.data[i][j]
        this.matrix[i][j].style.background = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')'
      }
    }
  }
  
  constructor(params) {
    this.width = params.width
    this.height = params.height
    this.matrix = []
    this.data = []
    
    for (let y=0; y<this.height; y++) {
      let row = document.createElement("div");
      row.style.cssText = "display: flex";
      let matrixRow = []
      let dataRow = []
      for (let x=0; x<this.width; x++) {
        let cell = document.createElement("div");
        cell.style.cssText = "border: 1px solid black; width: 30px; height: 33px; background: #000";
        row.appendChild(cell)
        matrixRow.push(cell)
        dataRow.push([0,0,0])
      }
      document.body.appendChild(row)
      this.matrix.push(matrixRow)
      this.data.push(dataRow)
    }
    
  }
}