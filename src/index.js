window.screenmain = document.getElementById("screenmain")

function configpage() {
    screenmain.innerHTML = "<style>.btn-lg-lg{font-size:3vw;margin-top:5vh}</style><h1 class='textlogo' style='color:#999999;'> CONFIGURAÇÕES </h1><br><button class='btn btn-block btn-outline-success btn-lg-lg'type='button'>CONFIGURAÇÕES DE ADMIN</button><br><button class='btn btn-block btn-outline-success btn-lg-lg'type='button'>IMPRIMIR RELATÓRIO</button><br><button class='btn btn-block btn-outline-success btn-lg-lg'type='button'>IMPORTAR DADOS</button><br><button class='btn btn-block btn-outline-success btn-lg-lg'type='button'>EXPORTAR DADOS</button><br>"
}

function cadastrarlivro() {
    screenmain.innerHTML = "<h1 class='textlogo' style='color:#999999;'> CADASTRAR LIVRO</h1><br><input class='form-control form-control-lg' type='text' id='bookname' placeholder='NOME DO LIVRO'><input class='form-control form-control-lg' type='text' id='bookname' placeholder='AUTOR DO LIVRO'><select class='form-control form-control-lg' type='text' id='bookname' ><option>GÊNERO DO LIVRO</option></select><br><button class='btn btn-block btn-outline-success btn-lg'type='button'>CADASTRAR LIVRO</button>"
}