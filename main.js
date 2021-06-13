const table = document.getElementById("tab");


class Grid {
    constructor() {
        this.showTable(this.inputSudoku());
    }

    readSudoku() {
        var sudoku = [];
        for (var r = 0; r < 9; r++) {
            sudoku.push([]);
            for (var c = 0; c < 9; c++) {
                var id = r.toString() + c.toString();
                var value = document.getElementById(id).value;
                if (value === "") {
                    sudoku[r].push(0);
                } else {
                    sudoku[r].push(parseInt(value));
                }
            }
        }
        return sudoku;
    }

    inputSudoku() {
        var sudoku = [];
        for (var r = 0; r < 9; r++) {
            sudoku.push([]);
            for (var c = 0; c < 9; c++) {
                var id = r.toString() + c.toString();
                var inputField = document.createElement("input");
                inputField.setAttribute("type", "text");
                inputField.setAttribute("id", id);
                sudoku[r].push(inputField);
            }
        }
        return sudoku;
    }

    showTable(board) {
        table.innerHTML = "";
        for (var r = 0; r < 9; r++) {
            var row = document.createElement("tr");
            if (r % 3 === 0) {
                row.setAttribute("class", "topDiv")
            }
            for (var c = 0; c < 9; c++) {
                var col = document.createElement("td");
                if (c % 3 === 0) {
                    col.setAttribute("class", "leftDiv");
                }
                col.appendChild(board[r][c]);
                row.appendChild(col);
            }
            table.appendChild(row);
        }
    }
}


class Solver {
    constructor(sudoku) {
        this.sudoku = sudoku;
    }

    solve() {
        var filled = this.fill();
        if (filled === true) {
            var solved = [];
            for (var r = 0; r < 9; r++) {
                solved.push([]);
                for (var c = 0; c < 9; c++) {
                    var cell = document.createElement("span");
                    cell.innerHTML = this.sudoku[r][c];
                    solved[r].push(cell);
                }
            }
            return solved;
        } else {
            alert("This sudoku has no solution. Please check your entries.");
            return null;
        }
    }

    fill() {
        var coord = this.nextEmpty();
        if (coord === -1) {
            return true;
        }
        var r = (Math.floor(coord / 9));
        var c = coord % 9;

        for (var number = 1; number < 10; number++) {
            if (this.isValid(number, r, c)) {
                this.sudoku[r][c] = number;
                if (this.fill()) {
                    return true;
                }
                this.sudoku[r][c] = 0;
            }
        }
        return false;
    }

    nextEmpty() {
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                if (this.sudoku[r][c] === 0) {
                    return 9 * r + c;
                }
            }
        }
        return -1;
    }

    isValid(number, r, c) {
        if (this.sudoku[r].includes(number)) {
            return false;
        }
        for (var row = 0; row < 9; row++) {
            if (this.sudoku[row][c] === number) {
                return false;
            }
        }
        var boxRow = (Math.floor(r / 3)) * 3;
        var boxCol = (Math.floor(c / 3)) * 3;
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                if (this.sudoku[row + boxRow][col + boxCol] === number) {
                    return false;
                }
            }
        }
        return true;
    }
}


function solve() {
    var board = grid.readSudoku();
    var solved = new Solver(board).solve();
    if (solved != null) {
        grid.showTable(solved);
    }
}

function reset() {
    grid = new Grid();
}


var grid = new Grid();