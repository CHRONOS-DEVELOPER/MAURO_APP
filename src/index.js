window.screenmain = document.getElementById("screenmain")

function configpage() {
    screenmain.innerHTML = "<style>.btn-lg-lg{font-size:3vw;margin-top:5vh}</style><h1 class='textlogo' style='color:#999999;'> CONFIGURAÇÕES </h1><br><button onclick='configuraradminpage()' class='btn btn-block btn-outline-success btn-lg-lg'type='button'>CONFIGURAÇÕES DE ADMIN</button><br><button onclick='imprimir()'class='btn btn-block btn-outline-success btn-lg-lg'type='button'>IMPRIMIR RELATÓRIO</button><br><button onclick='telaupload()'class='btn btn-block btn-outline-success btn-lg-lg'type='button'>IMPORTAR DADOS</button><br><button onclick='gerararquivo()'class='btn btn-block btn-outline-success btn-lg-lg'type='button'>EXPORTAR DADOS</button><br><button onclick='apagarlivropage()'class='btn btn-block btn-outline-success btn-lg-lg'type='button'>APAGAR LIVRO</button><br>"
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

function acessaracervopage() {
    screenmain.innerHTML = "<h1 class='textlogo' style='color:#999999;'>PROCURAR LIVRO</h1><br><input class='form-control form-control-lg' type='text' id='bookname' placeholder='NOME DO LIVRO'><br><button onclick='procurarlivro()' class='btn btn-block btn-outline-success btn-lg'type='button'>BUSCAR LIVRO</button><br><button onclick='listarlivros()' class='btn btn-block btn-outline-success btn-lg'type='button'>LISTA COMPLETA</button>"
    document.getElementById("bookname").focus();
    document.getElementById("bookname").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            procurarlivro();

        }
    })

}

function procurarlivro() {
    bookname = document.getElementById("bookname").value;
    booklist = []

    if (bookname != "") {
        DB_books = JSON.parse(localStorage.DB_books)
        screenmain.innerHTML = "<div style=' max-height:80vh; overflow-y:scroll;width:70vw; margin:3vh 2vw;'><table id='tabeladelivros' class='table table-striped table-light'><thead><tr><th scope='col'>NOME DO LIVRO</th><th scope='col'>GÊNERO DO LIVRO</th><th scope='col'>STATUS</th><th scope='col'>ALUNO</th><th scope='col'>DATA DE EMPRÉSTIMO</th></tr></thead><tbody></tbody></table><br></div><button onclick='acessaracervopage()' class='btn btn-block btn-outline-success btn-lg'type='button'>VOLTAR</button>"
        n = 1
        DB_books.forEach(element => {
            if (element.bookname == bookname) {
                table = "<tr><th scope='col'>" + element.bookname + "</th><th scope='col'>" + element.bookgender + "</th><th id='" + n + "' scope='col'>" + element.status + "</th><th id='" + n + "'scope='col'>" + element.aluno + "</th><th scope='col'>" + element.datadeemprestimo + "</th></tr>"
                $("#tabeladelivros").append(table);
                if (element.status == "disponível") {
                    statusstyle = document.getElementById(n).classList.add("text-success")
                } else {
                    statusstyle = document.getElementById(n).classList.add("text-danger")
                }


                n++;
            }

        })

    }
}

function listarlivros() {
    bookname = document.getElementById("bookname").value;
    booklist = []


    DB_books = JSON.parse(localStorage.DB_books)
    screenmain.innerHTML = "<div style=' max-height:80vh; overflow-y:scroll;width:70vw; margin:3vh 2vw;'><table id='tabeladelivros' class='table table-striped table-light'><thead><tr><th scope='col'>NOME DO LIVRO</th><th scope='col'>GÊNERO DO LIVRO</th><th scope='col'>STATUS</th><th scope='col'>ALUNO</th><th scope='col'>DATA DE EMPRÉSTIMO</th></tr></thead><tbody></tbody></table><br></div><button onclick='acessaracervopage()' class='btn btn-block btn-outline-success btn-lg'type='button'>VOLTAR</button>"
    n = 1
    DB_books.forEach(element => {

        table = "<tr><th scope='col'>" + element.bookname + "</th><th scope='col'>" + element.bookgender + "</th><th id='" + n + "' scope='col'>" + element.status + "</th><th id='" + n + "'scope='col'>" + element.aluno + "</th><th scope='col'>" + element.datadeemprestimo + "</th></tr>"
        $("#tabeladelivros").append(table);
        if (element.status == "disponível") {
            statusstyle = document.getElementById(n).classList.add("text-success")
        } else {
            statusstyle = document.getElementById(n).classList.add("text-danger")
        }


        n++;


    })

}

function homepage() {
    if (localStorage.DB_books) {
        DB_books = JSON.parse(localStorage.DB_books)

        screenmain.innerHTML = "<h1 class='textlogohome' style='color:#999999;'> LIVROS INDISPONÍVEIS </h1><div style=' max-height:95vh; overflow-y:scroll;width:70vw; margin:3vh 2vw;'><table id='tabeladelivros' class='table table-striped table-light'><thead><tr><th scope='col'>NOME DO LIVRO</th><th scope='col'>GÊNERO DO LIVRO</th><th scope='col'>STATUS</th><th scope='col'>ALUNO</th><th scope='col'>DATA DE EMPRÉSTIMO</th></tr></thead><tbody></tbody></table><br></div>"
        n = 1
        DB_books.forEach(element => {
            if (element.status == "indisponível") {
                table = "<tr><th scope='col'>" + element.bookname + "</th><th scope='col'>" + element.bookgender + "</th><th id='" + n + "' scope='col'>" + element.status + "</th><th id='" + n + "'scope='col'>" + element.aluno + "</th><th scope='col'>" + element.datadeemprestimo + "</th></tr>"
                $("#tabeladelivros").append(table);
                statusstyle = document.getElementById(n).classList.add("text-danger")
                n++;
            }

        })
        if (n == 1) {
            screenmain.innerHTML = "<h1 class='textlogo' style='color:#999999; margin: 50vh 0'> NENHUM LIVRO INDISPONÍVEL</h1>"
        }
    } else {
        screenmain.innerHTML = "<h1 class='textlogo' style='color:#999999; margin: 50vh 0'> CADASTRE OS LIVROS</h1>"
    }
}

function emprestarlivropage() {
    screenmain.innerHTML = "<h1 class='textlogo' style='color:#999999;'>PROCURAR LIVRO EMPRESTIMO</h1><br><input class='form-control form-control-lg' type='text' id='bookname' placeholder='NOME DO LIVRO'><input class='form-control form-control-lg' type='text' id='ALUNOname' placeholder='NOME ALUNO'><br><button onclick='emprestimodelivro()' class='btn btn-block btn-outline-success btn-lg'type='button'>BUSCAR LIVRO</button>"
    document.getElementById("bookname").focus();
    document.getElementById("bookname").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById("ALUNOname").focus()

        }
    })
    document.getElementById("ALUNOname").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            emprestimodelivro();

        }
    })
}

function emprestimodelivro() {
    bookname = document.getElementById("bookname").value;
    window.alunoname = document.getElementById("ALUNOname").value
    booklist = []

    if (bookname != "" && alunoname != "") {
        DB_books = JSON.parse(localStorage.DB_books)
        window.idlivro = bookname
        screenmain.innerHTML = "<div style=' max-height:80vh; overflow-y:scroll;width:70vw; margin:3vh 2vw;'><table id='tabeladelivros' class='table table-striped table-light'><thead><tr><th scope='col'>NOME DO LIVRO</th><th scope='col'>GÊNERO DO LIVRO</th><th scope='col'>STATUS</th><th scope='col'>ALUNO</th><th scope='col'>DATA DE EMPRÉSTIMO</th></tr></thead><tbody></tbody></table><br></div><button id='buttonenter' onclick='emprestar()'class='btn btn-block btn-outline-success btn-lg'type='button'>EMPRESTAR</button><br><button onclick='emprestarlivropage()'class='btn btn-block btn-outline-success btn-lg'type='button'>VOLTAR</button>"
        n = 1
        DB_books.forEach(element => {
            if (element.bookname == bookname) {
                table = "<tr><th scope='col'>" + element.bookname + "</th><th scope='col'>" + element.bookgender + "</th><th id='" + n + "' scope='col'>" + element.status + "</th><th id='" + n + "'scope='col'>" + element.aluno + "</th><th scope='col'>" + element.datadeemprestimo + "</th></tr>"
                $("#tabeladelivros").append(table);
                if (element.status == "disponível") {
                    statusstyle = document.getElementById(n).classList.add("text-success")
                } else {
                    statusstyle = document.getElementById(n).classList.add("text-danger")
                }


                n++;
            }

        })

    }

}

function emprestar() {
    DB_books = JSON.parse(localStorage.DB_books)

    DB_books.every((element, res) => {
        if (element.bookname == idlivro && element.status == "disponível") {
            DB_books[res].status = "indisponível"
            DB_books[res].aluno = alunoname;
            data = new Date();
            dia = data.getDate();
            mes = data.getMonth() + 1;
            ano = data.getFullYear();
            DB_books[res].datadeemprestimo = dia + "/" + mes + "/" + ano
            localStorage.DB_books = JSON.stringify(DB_books)
            return false
        } else {
            return true
        }

    });
    homepage()
}

function devolverlivropage() {
    screenmain.innerHTML = "<h1 class='textlogo' style='color:#999999;'>PROCURAR LIVRO DEVOLUÇÃO</h1><br><input class='form-control form-control-lg' type='text' id='bookname' placeholder='NOME DO LIVRO'><input class='form-control form-control-lg' type='text' id='ALUNOname' placeholder='NOME ALUNO'><br><button onclick='devoluçãodelivro()' class='btn btn-block btn-outline-success btn-lg'type='button'>BUSCAR LIVRO</button>"
    document.getElementById("bookname").focus();
    document.getElementById("bookname").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById("ALUNOname").focus()

        }
    })
    document.getElementById("ALUNOname").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            devoluçãodelivro();

        }
    })
}

function devoluçãodelivro() {
    bookname = document.getElementById("bookname").value;
    window.alunoname = document.getElementById("ALUNOname").value
    booklist = []

    if (bookname != "" && alunoname != "") {
        DB_books = JSON.parse(localStorage.DB_books)
        window.idlivro = bookname
        screenmain.innerHTML = "<div style=' max-height:80vh; overflow-y:scroll;width:70vw; margin:3vh 2vw;'><table id='tabeladelivros' class='table table-striped table-light'><thead><tr><th scope='col'>NOME DO LIVRO</th><th scope='col'>GÊNERO DO LIVRO</th><th scope='col'>STATUS</th><th scope='col'>ALUNO</th><th scope='col'>DATA DE EMPRÉSTIMO</th></tr></thead><tbody></tbody></table><br></div><button id='buttonenter' onclick='devolver()'class='btn btn-block btn-outline-success btn-lg'type='button'>DEVOLVER</button><br><button onclick='devolverlivropage()'class='btn btn-block btn-outline-success btn-lg'type='button'>VOLTAR</button>"
        n = 1
        DB_books.forEach(element => {
            if (element.bookname == bookname && element.aluno == alunoname) {
                table = "<tr><th scope='col'>" + element.bookname + "</th><th scope='col'>" + element.bookgender + "</th><th id='" + n + "' scope='col'>" + element.status + "</th><th id='" + n + "'scope='col'>" + element.aluno + "</th><th scope='col'>" + element.datadeemprestimo + "</th></tr>"
                $("#tabeladelivros").append(table);
                statusstyle = document.getElementById(n).classList.add("text-danger")
                n++;
            }

        })

    }
}

function devolver() {
    DB_books = JSON.parse(localStorage.DB_books)

    DB_books.every((element, res) => {
        if (element.bookname == idlivro && element.status == "indisponível" && element.aluno == alunoname) {
            DB_books[res].status = "disponível"
            DB_books[res].aluno = "livre";

            DB_books[res].datadeemprestimo = null
            localStorage.DB_books = JSON.stringify(DB_books)
            return false
        } else {
            return true
        }

    });
    homepage()
}

function pesquisarfichapage() {
    screenmain.innerHTML = "<h1 class='textlogo' style='color:#999999;'>PROCURAR ALUNO</h1><br><input class='form-control form-control-lg' type='text' id='ALUNOname' placeholder='NOME ALUNO'><br><button onclick='pesquisarficha()' class='btn btn-block btn-outline-success btn-lg'type='button'>BUSCAR ALUNO</button>"
    document.getElementById("ALUNOname").focus();
    document.getElementById("ALUNOname").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            pesquisarficha()

        }
    })
}

function pesquisarficha() {
    window.alunoname = document.getElementById("ALUNOname").value
    if (alunoname != "") {
        DB_books = JSON.parse(localStorage.DB_books)
        window.idlivro = bookname
        screenmain.innerHTML = "<div style=' max-height:80vh; overflow-y:scroll;width:70vw; margin:3vh 2vw;'><table id='tabeladelivros' class='table table-striped table-light'><thead><tr><th scope='col'>NOME DO LIVRO</th><th scope='col'>GÊNERO DO LIVRO</th><th scope='col'>STATUS</th><th scope='col'>ALUNO</th><th scope='col'>DATA DE EMPRÉSTIMO</th></tr></thead><tbody></tbody></table><br></div><br><button onclick='pesquisarfichapage()'class='btn btn-block btn-outline-success btn-lg'type='button'>VOLTAR</button>"
        n = 1
        DB_books.forEach(element => {
            if (element.aluno == alunoname) {
                table = "<tr><th scope='col'>" + element.bookname + "</th><th scope='col'>" + element.bookgender + "</th><th id='" + n + "' scope='col'>" + element.status + "</th><th id='" + n + "'scope='col'>" + element.aluno + "</th><th scope='col'>" + element.datadeemprestimo + "</th></tr>"
                $("#tabeladelivros").append(table);
                statusstyle = document.getElementById(n).classList.add("text-danger")
                n++;
            }

        })

    }
}

function configuraradminpage() {
    screenmain.innerHTML = "<h1 class='textlogo' style='color:#999999;'>CONFIGURAÇÕES DE ADMINISTRADOR</h1><br><input class='form-control form-control-lg' type='text' id='adminname' placeholder='NOME DO ADMINISTRADOR'><input class='form-control form-control-lg' type='text' id='adminpass' placeholder='SENHA DO ADMINISTRADOR'><br><button onclick='alterardados()' class='btn btn-block btn-outline-success btn-lg'type='button'>ATUALIZAR DADOS</button>"
    document.getElementById("adminname").focus();
    document.getElementById("adminname").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById("adminpass").focus()

        }
    })
    document.getElementById("adminpass").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            alterardados();

        }
    })
}

function alterardados() {
    admindb = JSON.parse(localStorage.AdminUser)
    admindb.user = document.getElementById("adminname").value;
    admindb.password = document.getElementById("adminpass").value;
    localStorage.AdminUser = JSON.stringify(admindb);
    screenmain.innerHTML = "<h1 class='textlogo' style='color:#999999; margin: 50vh 0'> DADOS ALTERADOS COM SUCESSO!!</h1>"
    var delayInMilliseconds = 3000;

    setTimeout(function() {
        homepage()
    }, delayInMilliseconds);

}

function imprimir() {
    body = document.getElementById("body")
    DB_books = JSON.parse(localStorage.DB_books)
    body.innerHTML = "<table id='tabeladelivros' class='table table-striped table-light'><thead><tr><th scope='col'>NOME DO LIVRO</th><th scope='col'>GÊNERO DO LIVRO</th><th scope='col'>STATUS</th><th scope='col'>ALUNO</th><th scope='col'>DATA DE EMPRÉSTIMO</th></tr></thead><tbody></tbody></table>"
    n = 1
    DB_books.forEach(element => {
        if (element.status == "indisponível") {
            table = "<tr><th scope='col'>" + element.bookname + "</th><th scope='col'>" + element.bookgender + "</th><th id='" + n + "' scope='col'>" + element.status + "</th><th id='" + n + "'scope='col'>" + element.aluno + "</th><th scope='col'>" + element.datadeemprestimo + "</th></tr>"
            $("#tabeladelivros").append(table);
            if (element.status == "disponível") {
                statusstyle = document.getElementById(n).classList.add("text-success")
            } else {
                statusstyle = document.getElementById(n).classList.add("text-danger")
            }


            n++;

        }
    })
    window.print();
    window.location.assign("index.html")

}

function apagarlivropage() {
    screenmain.innerHTML = "<h1 class='textlogo' style='color:#999999;'>PROCURAR LIVRO A APAGAR</h1><br><input class='form-control form-control-lg' type='text' id='bookname' placeholder='NOME DO LIVRO'><button onclick='livroapagar()' class='btn btn-block btn-outline-success btn-lg'type='button'>BUSCAR LIVRO</button>"
    document.getElementById("bookname").focus();
    document.getElementById("bookname").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            livroapagar();

        }
    })
}

function livroapagar() {
    var bookname = document.getElementById("bookname").value;


    booklist = []

    if (bookname != "") {
        DB_books = JSON.parse(localStorage.DB_books)
        window.idlivro = bookname
        screenmain.innerHTML = "<div style=' max-height:80vh; overflow-y:scroll;width:70vw; margin:3vh 2vw;'><table id='tabeladelivros' class='table table-striped table-light'><thead><tr><th scope='col'>NOME DO LIVRO</th><th scope='col'>GÊNERO DO LIVRO</th><th scope='col'>STATUS</th><th scope='col'>ALUNO</th><th scope='col'>DATA DE EMPRÉSTIMO</th></tr></thead><tbody></tbody></table><br></div><input class='form-control form-control-lg' type='number' id='quantidade' placeholder='QUANTIDADE'><br><button onclick='apagarfinal()' class='btn btn-block btn-outline-success btn-lg'type='button'>APAGAR</button>"
        n = 1
        idlivros = [];
        DB_books.forEach((element, res) => {
            if (element.bookname == bookname) {
                table = "<tr><th scope='col'>" + element.bookname + "</th><th scope='col'>" + element.bookgender + "</th><th id='" + n + "' scope='col'>" + element.status + "</th><th id='" + n + "'scope='col'>" + element.aluno + "</th><th scope='col'>" + element.datadeemprestimo + "</th></tr>"
                $("#tabeladelivros").append(table);
                idlivros.push(res)
                if (element.status == "disponível") {
                    statusstyle = document.getElementById(n).classList.add("text-success")
                } else {
                    statusstyle = document.getElementById(n).classList.add("text-danger")
                }


                n++;
            }

        })

    }
    document.getElementById("quantidade").focus();
    document.getElementById("quantidade").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            apagarfinal();

        }
    })

}

function apagarfinal() {
    quantidade = document.getElementById("quantidade").value;
    DB_books = JSON.parse(localStorage.getItem("DB_books"))
    if (quantidade > 0 && quantidade <= idlivros.length) {
        DB_books.splice(idlivros[0], quantidade);
        localStorage.DB_books = JSON.stringify(DB_books);

    }
    screenmain.innerHTML = "<h1 class='textlogo' style='color:#999999; margin: 50vh 0'> DADOS ALTERADOS COM SUCESSO!!</h1>"
    var delayInMilliseconds = 3000;

    setTimeout(function() {
        homepage()
    }, delayInMilliseconds);
}
