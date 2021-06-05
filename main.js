class Table {

    readSudoku() {
        var sudoku = [];
        for (var r=0; r<9; r++) {
            sudoku.push([]);
            for (var c=0; c<9; c++) {
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

    solve() {
        var board = sudoku.readSudoku();
        var solver = new Solver(board);
        sudoku.showOutputTable(solver.solve());
    }

    showInputTable() {
        var table = "";
        for (var r=0; r<9; r++) {
            if (r%3 === 0) {
                table += "<tr class='topDiv'>";
            } else {
                table += "<tr>";
            }
            for (var c=0; c<9; c++) {
                if (c%3 === 0) {
                    table += "<td class='leftDiv'>";
                } else {
                    table += "<td>";
                }
                table += "<input type='text' id='" + r + c+ "'>" + "</td>";
            }
            table += "</tr>";
        }
        document.getElementById("tab").innerHTML = table;
    }

    showOutputTable(board) {
        var table = "";
        for (var r=0; r<9; r++) {
            if (r%3 === 0) {
                table += "<tr class='topDiv'>";
            } else {
                table += "<tr>";
            }
            for (var c=0; c<9; c++) {
                if (c%3 === 0) {
                    table += "<td class='leftDiv'>";
                } else {
                    table += "<td>";
                }
                table += board[r][c] + "</td>";

            }
            table += "</tr>";
        }
        document.getElementById("tab").innerHTML = table;
    }
}


class Solver {
    constructor(sudoku) {
        this.sudoku = sudoku;
    }

    solve() {
        var filled = this.fill();
        if (filled === true) {
            return this.sudoku;
        }
    }

    fill() {
        var coord = this.nextEmpty();
        if (coord === -1) {
            return true;
        }
        var r = (Math.floor(coord/9));
        var c = coord%9;

        for (var number=1; number<10; number++) {
            if (this.isValid(number, r, c)) {
                this.sudoku[r][c] = number;
                if (this.solve()) {
                    return true;
                }
                this.sudoku[r][c] = 0;
            }
        }
        return false;
    }

    nextEmpty() {
        for (var r=0; r<9; r++) {
            for (var c=0; c<9; c++) {
                if (this.sudoku[r][c] === 0) {
                    return 9*r+c;
                }
            }
        }
        return -1;
    }

    isValid(number, r, c) {
        if (this.sudoku[r].includes(number)) {
            return false;
        }
        for (var row=0; row<9; row++) {
            if (this.sudoku[row][c] === number) {
                return false;
            }
        }
        var boxRow = (Math.floor(r/3)) * 3;
        var boxCol = (Math.floor(c/3)) * 3;
        for (var row=0; row<3; row++) {
            for (var col=0; col<3; col++) {
                if (this.sudoku[row+boxRow][col+boxCol] === number) {
                    return false;
                }
            }
        }
        return true;
    }
}


var sudoku = new Table();
sudoku.showInputTable();

var solveBTN = document.getElementById("solve");
var resetBTN = document.getElementById("reset");

solveBTN.addEventListener("click", sudoku.solve);
resetBTN.addEventListener("click", sudoku.showInputTable);
