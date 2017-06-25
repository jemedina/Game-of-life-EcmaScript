class Universe {

    constructor(size) {
        this.size = size
        this.existence = Array.from({length: this.size}, () =>
                Array.from({length: this.size}, () => Math.random() > 0.5 ? 1 : 0)
            )
    }

    copy(otherExistence) {
        this.existence = JSON.parse(
            JSON.stringify(otherExistence)
        )
    }

    evolution() {
        var tempUniverse = new Universe(this.size)
        this.existence.forEach( (row, rowIndex) =>
            row.forEach( (cell, colIndex) => {
                var numberOfDestiny = this.getNumberOfDestiny(rowIndex,colIndex)
                tempUniverse.existence[rowIndex][colIndex] = this.getDestiny(numberOfDestiny,cell)
            })
        )
        this.copy(tempUniverse.existence)
    }

    getNumberOfDestiny(x, y) {
        var neighbors = 0
        for(var i = x-1 ; i <= x+1; i++) 
            for(var j = y-1; j <= y+1; j++) 
                if( i >= 0 && i < this.size && j >= 0 && j < this.size && !(i == x && j == y) && this.existence[i][j] == 1) 
                    neighbors++
        return neighbors
    }

    getDestiny(numberOfDestiny, cell) {
        if(numberOfDestiny < 2 || numberOfDestiny > 3) {
            return 0
        } else if(numberOfDestiny == 3) {
            return 1
        } else {
            return cell
        }
    }
}

var universe = new Universe(60)
var canvasCtx = document.getElementById("canvasGOL").getContext("2d")

var clearCanvas = () => {
    canvasCtx.fillStyle ="#FFFFFF"
    canvasCtx.fillRect(0,0,600,600)
}

var drawUniverse = () => {
    canvasCtx.fillStyle ="#000"
    universe.existence.forEach( (row, rowIndex) =>
        row.forEach( (cell, colIndex) => {
            if(cell == 1) {
                canvasCtx.fillRect(rowIndex*10,colIndex*10,10,10)
            }
        })
    )
}

function update() {
    clearCanvas()
    drawUniverse()
    universe.evolution()
    setTimeout(update,100)
}
update()