window.buttonwelcome = document.getElementById("welcomebutton")
document.getElementById("user").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById("password").focus();
        }
    })
    //document.getElementById("password")

function welcome() {
    if (localStorage.AdminUser) {
        document.getElementById("password").addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                login()
            }
        })
    } else {
        document.getElementById("password").addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                cadastrar()
            }
        })
        buttonwelcome.innerHTML = "<button onclick='cadastrar()' class='btn btn-outline-success btn-group-lg' >CADASTRAR ADMINISTRADOR</button>"
    }
}


function cadastrar() {
    user = document.getElementById("user").value;
    password = document.getElementById("password").value;
    if (user != "" && password != "") {

        localStorage.AdminUser = JSON.stringify({ "user": user, "password": password })
        window.location.assign("index.html")
    } else {

        buttonwelcome.innerHTML = "<h1> DADOS INVÁLIDOS</h1>"
        var delayInMilliseconds = 5000;

        setTimeout(function() {
            window.location.assign("welcome.html");
        }, delayInMilliseconds);

    }
}

function login() {
    user = document.getElementById("user").value;
    password = document.getElementById("password").value;
    admin = JSON.parse(localStorage.AdminUser);
    if (user != "" && admin.user == user && password != "" && admin.password == password) {

        window.location.assign("index.html");
    } else {

        buttonwelcome.innerHTML = "<h1> DADOS INVÁLIDOS</h1>"
        var delayInMilliseconds = 5000;

        setTimeout(function() {
            window.location.assign("welcome.html");
        }, delayInMilliseconds);

    }
}