let col = 15;
let row = 20;

let score = 0; // Текущее число очков

let fieldData = []; // Массив состояния поля

let speed = 800;

let gameState = 0; // Переменная состояния игры (для проигрыша)

let gameSpeed;

let figure = []; // Массив паттерна текущей фигуры
let figureNext = []; // Массив паттерна следующей фигуры

let fXY = [0, 0]; // Массив координат левого верхнего угла фигуры

function addKeyEvent() {
    document.addEventListener('keydown', (event) => {
        let keys = {
            37:'left',
            39:'right',
            40:'down',
            38:'rotate',
            27:'escape'
        };
        if (keys[event.keyCode]) {
            makeAction(keys[event.keyCode]);
        }
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function setRandFigure() {
    let figureIn = []
    let type = types[getRandomInt(types.length)]
    for (let x = 0; x < 4; x++) {
        figureIn[x] = []
        for (let y = 0; y < 4; y++) {
            figureIn[x][y] = type[y][x] // Перенос фигуры из массива паттернов (data.js)
        }
    }
    console.log(figureIn)
    return figureIn
}

function createFigures() {
    figure = setRandFigure()
    figureNext = setRandFigure()
}

function updateFigures() {
    figure = figureNext
    figureNext = setRandFigure()
}

function rotateFigure() {
    let newFigure = []
    let cell
    for (let x = 0; x < 4; x++) {
        newFigure[x] = []
        for (let y = 0; y < 4; y++) {
            newFigure[x][y] = figure[y][3 - x];
        }
    }
    console.log(newFigure)
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            if (newFigure[x][y]) {
                if (x + fXY[0] < 0 || x + fXY[0] >= col)
                    return 1
                cell = fieldData[x + fXY[0]][y + fXY[1]]
                if (cell !== figure[x][y] && cell !== 0 || typeof (cell) === "undefined"
                    || y + fXY[1] >= row) {
                    return 1
                }
            }
        }
    }
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            if (figure[x][y])
                fieldData[x + fXY[0]][y + fXY[1]] = 0
            if (newFigure[x][y])
                fieldData[x + fXY[0]][y + fXY[1]] = newFigure[x][y]
        }
    }
    rotateSound()
    figure = newFigure
}

function increaseSpeed() {
    if (score >= 50) {
        if (score >= 100)
            if (score >= 200)
                speed = 300
            else
                speed = 500
        else {
            speed = 600
        }
    }
    clearInterval(gameSpeed)
    gameSpeed = setInterval(main, speed)
}

function moveFigure(oX, oY) {
    let newXY = [fXY[0] + oX, fXY[1] + oY]
    let cell
    let falsePlace = 0
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            if (figure[x][y]) {
                if (x + newXY[0] < 0 || x + newXY[0] >= col)
                    return 1
                cell = fieldData[x + newXY[0]][y + newXY[1]]
                if (cell !== figure[x][y] && cell !== 0 || typeof (cell) === "undefined"
                    || y + newXY[1] >= row) {
                    if ((fXY[1] === 0 || fXY[1] === -1) && cell !== 0) {
                        gameState = 1
                        return 2
                    } else if (!(x + newXY[0] < 0 && x + newXY[0] >= col))
                        falsePlace = 7 + figure[x][y];
                    else return 1
                }
            }
        }
    } // Проверка пригодности новой позиции фигуры
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            if (figure[x][y])
                fieldData[x + fXY[0]][y + fXY[1]] = falsePlace // Удаление отпечатка фигуры
        }
    }
    if (falsePlace)
        return falsePlace
    fXY = newXY
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            if (figure[x][y])
                fieldData[x + fXY[0]][y + fXY[1]] = figure[x][y] // Добавление отпечатка фигуры
        }
    }
}

function makeAction(key) { //Обработчик нажатий клавиш
    switch (key) {
        case 'left':
            moveFigure(-1, 0)
            break;
        case 'right':
            moveFigure(1, 0)
            break;
        case 'down':
            moveFigure(0, 1)
            break;
        case 'rotate':
            rotateFigure()
            break;
        case 'escape':
            window.alert('paused');
            break;
    }
}

function setFigureToStart() {
    fXY[0] = getRandomInt(col - 3)
    fXY[1] = figure[1][2] > 3 ? -1 : 0
    if (moveFigure(0, 0) !== 2) {
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                if (figure[x][y])
                    fieldData[x + fXY[0]][y + fXY[1]] = figure[x][y] // Перенос фигуры на поле
            }
        }
    }
}

function checkLines() {
    let clearLine = false
    for (let y = row - 1; y >= 0; y--) {
        clearLine = true
        for (let x = 0; x < col; x++) {
            if (fieldData[x][y] < 8) {
                clearLine = false
                break
            }
        }
        if (clearLine) {
            score += 10
            increaseSpeed()
            lineSound()
            for (let dy = y; dy > 0; dy--) {
                for (let dx = 0; dx < col; dx++) {
                    fieldData[dx][dy] = fieldData[dx][dy - 1]
                }
            }
            y += 1
        }
    }
}

function clearField() {
    for (let x = 0; x < col; x++) {
        fieldData[x] = []
        for (let y = 0; y < row; y++) {
            fieldData[x][y] = 0
        }
    }
}

function endGame() {
    alert("You lost!")
    gameState = 0
    updateTable(score)
    updateTableElement()
    clearField()
    createFigures()
    setFigureToStart()
    score = 0
    updateScore(score)
}

function main() {
    if (gameState === 1) {
        endGame()
    } else {
        let moveState = moveFigure(0, 1)
        if (moveState >= 8) {
            checkLines()
            updateScore(score)
            updateFigures()
            setFigureToStart()
        }
        if (gameState === 1) {
            endGame()
        }
    }
}

clearField()
createFigures()
setFigureToStart()
addKeyEvent()

gameSpeed = setInterval(main, speed)