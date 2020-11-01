const engine = document.getElementById('field');
const preview = document.getElementById('preview');
let ctx = engine.getContext('2d')
let ptx = preview.getContext('2d')
let width = engine.width, height = engine.height;
let blockWidth = width / col
let blockHeight = height / row;
let invisibleColor = 'rgba(0,0,0,0)';
ctx.strokeStyle = invisibleColor;
ptx.strokeStyle = invisibleColor;


function renderField() {
    ctx.clearRect(0, 0, width, height);
    for (let x = 0; x < col; x++) {
        for (let y = 0; y < row; y++) {
            ctx.fillStyle = colors[fieldData[x][y]];
            ctx.fillRect(blockWidth * x, blockHeight * y, blockWidth - 1, blockHeight - 1)
            ctx.strokeRect(blockWidth * x, blockHeight * y, blockWidth - 1, blockHeight - 1)
        }
    }
}

function renderPreview() {
    ptx.clearRect(0, 0, width, height);
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 4; y++) {
            ptx.fillStyle = colors[figureNext[x][y]];
            ptx.fillRect(blockWidth * x, blockHeight * y, blockWidth - 1, blockHeight - 1)
            ptx.strokeRect(blockWidth * x, blockHeight * y, blockWidth - 1, blockHeight - 1)
        }
    }
}

setInterval(renderField, 50)
setInterval(renderPreview, 50)