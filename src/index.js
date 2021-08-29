window.screenmain = document.getElementById("screenmain")

function configpage() {
    screenmain.innerHTML = "<style>.btn-lg-lg{font-size:3vw;margin-top:5vh}</style><h1 class='textlogo' style='color:#999999;'> CONFIGURAÇÕES </h1><br><button class='btn btn-block btn-outline-success btn-lg-lg'type='button'>CONFIGURAÇÕES DE ADMIN</button><br><button class='btn btn-block btn-outline-success btn-lg-lg'type='button'>IMPRIMIR RELATÓRIO</button><br><button onclick='telaupload()'class='btn btn-block btn-outline-success btn-lg-lg'type='button'>IMPORTAR DADOS</button><br><button onclick='gerararquivo()'class='btn btn-block btn-outline-success btn-lg-lg'type='button'>EXPORTAR DADOS</button><br>"
}

function cadastrarlivropage() {
    screenmain.innerHTML = "<h1 class='textlogo' style='color:#999999;'> CADASTRAR LIVRO</h1><br><input class='form-control form-control-lg' type='text' id='bookname' placeholder='NOME DO LIVRO'><input class='form-control form-control-lg' type='text' id='bookauthor' placeholder='AUTOR DO LIVRO'><input class='form-control form-control-lg' type='text' id='bookgender' placeholder='GÊNERO DO LIVRO'><input class='form-control form-control-lg' type='number' id='booksnumber' placeholder='UNIDADES'><br><button onclick='cadastrarlivro()' class='btn btn-block btn-outline-success btn-lg'type='button'>CADASTRAR LIVRO</button>"
    document.getElementById("bookname").focus();
    document.getElementById("bookname").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById("bookauthor").focus();
        }
    })
    document.getElementById("bookauthor").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById("bookgender").focus();
        }
    })
    document.getElementById("bookgender").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById("booksnumber").focus();
        }
    })
    document.getElementById("booksnumber").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            cadastrarlivro();
        }
    })
}


function cadastrarlivro() {
    bookname = document.getElementById("bookname").value;
    bookauthor = document.getElementById("bookauthor").value;
    bookgender = document.getElementById("bookgender").value;

    if (bookauthor != "" && bookgender != "" && bookname != "") {
        data = new Date();
        dia = data.getDate();
        mes = data.getMonth() + 1;
        ano = data.getFullYear();
        if (localStorage.DB_books) {
            DB_books = JSON.parse(localStorage.DB_books)
        } else {
            DB_books = []
        }

        for (n = 1; n <= document.getElementById("booksnumber").value; n++) {
            db = { "bookname": bookname, "bookgender": bookgender, "bookauthor": bookauthor, "status": "disponível", "aluno": "livre", "datadecadastro": dia + "/" + mes + "/" + ano, "datadeemprestimo": null }
            DB_books.push(db)
        }


        localStorage.setItem("DB_books", JSON.stringify(DB_books))
        screenmain.innerHTML = "<h1 class='textlogo' style='color:#999999; margin: 50vh 0'> LIVRO CADASTRADO COM SUCESSO</h1>"
        var delayInMilliseconds = 3000;

        setTimeout(function() {
            cadastrarlivropage()
        }, delayInMilliseconds);
    } else {
        screenmain.innerHTML = "<h1 class='textlogo' style='color:#999999; margin: 50vh 0'> DADOS INVÁLIDOS</h1>"
        var delayInMilliseconds = 3000;

        setTimeout(function() {
            cadastrarlivropage()
        }, delayInMilliseconds);
    }
}

function telaupload() {
    screenmain.innerHTML = "<input  style=' margin: 50vh 0'type='file' id='myFile'><button onclick='importarDB()'>CONCLUIR</button>"
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}



function importarDB() {

    var myUploadedFile = document.getElementById("myFile").files[0];

    readTextFile(myUploadedFile.path, function(text) {

        if (localStorage.DB_books) {
            var data = JSON.parse(text);
            DBimport = JSON.parse(localStorage.DB_books)
            data.forEach(element => {

                DBimport.push(element)
            });
            localStorage.DB_books = JSON.stringify(DBimport)
        } else(
            localStorage.DB_books = text
        )

        configpage()
    });
}

function gerararquivo() {
    blob = new Blob([localStorage.DB_books], { type: "text/plain;charset=UTF-8" })
    saveAs(blob, "backupbiblioteca.json")
    configpage()
}