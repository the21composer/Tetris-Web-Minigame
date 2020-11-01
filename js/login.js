function setName() {
    let name = document.getElementById("login").value;
    if (name === "") {
        window.alert("Имя пустое!");
    } else {
        localStorage.setItem("username", name);
        window.location.href = "../templates/game.html";
    }
}
