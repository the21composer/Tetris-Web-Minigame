function getName() {
    if (localStorage.hasOwnProperty("username")) {
        let name = localStorage.getItem("username");
        let login = document.getElementById("login");
        login.innerHTML = name;
        let score = document.getElementById("score");
        score.innerHTML = '0';
    } else {
        window.location.href = "../templates/index.html";
    }
}

function updateScore(score) {
    let scoreElement = document.getElementById("score");
    scoreElement.innerHTML = score;
}

function updateTableElement() {
    let tableData = JSON.parse(localStorage.getItem("table"))
    tableData = tableData.sort(function (a, b) {
        return b.score - a.score;
    })
    let tableElement = document.getElementById("table")
    let table = '<table class="table table-striped table-bordered table-sm">';
    for (let i = 0; i < tableData.length; i++) {
        table += '<tr>';
        table += '<td>' + (Number(i) + 1) + '</td>';
        table += '<td>' + tableData[i].username + '</td>';
        table += '<td>' + tableData[i].score + '</td>';
        table += '</tr>';
    }
    table += '</table>';
    tableElement.innerHTML = table;
}


function updateTable(score) {
    let table = []
    if (localStorage.hasOwnProperty("table")) {
        table = JSON.parse(localStorage.getItem("table"))
    }
    let user = table.find(a => a.username === localStorage.getItem("username"))
    if (user) {
        if (user.score < score) {
            table.splice(table.indexOf(user), 1)
            table.push({
                username:localStorage.getItem("username"),
                score:score
            })
        }
    } else {
        table.push({
            username:localStorage.getItem("username"),
            score:score
        })
    }

    table = table.sort(function (a, b) {
        return b.score - a.score;
    })
    localStorage.setItem("table", JSON.stringify(table))
}

function lineSound() {
    let audio = new Audio();
    audio.src = 'line.wav';
    audio.autoplay = true;
}

function rotateSound() {
    let audio = new Audio();
    audio.src = 'hihat.wav';
    audio.autoplay = true;
}