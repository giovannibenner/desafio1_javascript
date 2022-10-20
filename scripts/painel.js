import { clientes } from "../modules/clientes.js";
import { produtos } from "../modules/produtos.js"

var button = document.querySelectorAll("a");

for(let i = 0; i < button.length; i++)
{
    button[i].addEventListener('click', (button) =>
    {
        let active = document.forms;
        
        let id;

        if(button.target.id == "click-clientes")
            id = "clientes";
        else if(button.target.id == "click-produtos")
            id = "produtos";
        else
            id = "pedidos";

        let form = document.getElementById(id);
        
        if(form.classList.contains("hidden"))
        {
            if(form.id == 'clientes')
                NavegaCliente(1);
            else if (form.id == 'produtos')
                NavegaProduto(1);
    
            for(let forms of active)
                forms.classList.add("hidden");

            form.classList.remove("hidden");
        }
        else
            form.classList.add("hidden");

    })
}


// Quebra galho por enquanto, refatorar depois
let x = document.querySelectorAll(".x-button");
for(let i = 0; i < x.length; i++)
{
    x[i].addEventListener('click', function()
    {
        x[i].parentElement.parentElement.classList.add("hidden");
        x[i].parentElement.parentElement.classList.remove("visible");
    })
}

let prev_next = document.querySelectorAll(".prev-next");
for(let i = 0; i < prev_next.length; i++)
{
    prev_next[i].addEventListener('click', (button) =>
    {
        let cod = Number(prev_next[i].parentElement.parentElement.parentElement[0].value);
        if(button.target.id == "prev-cliente")
            NavegaCliente(cod -1);
        else if(button.target.id == "next-cliente")
            NavegaCliente(cod +1);
        else if(button.target.id == "prev-produto")
            NavegaProduto(cod -1);
        else if(button.target.id == "next-produto")
            NavegaProduto(cod +1);
    })
}

function NavegaCliente(cod)
{
    try{
        if(cod < 1 || cod > clientes.lenght)
            throw "erro";
    
        let form = document.forms[0];
        form[0].value = clientes[cod-1]["codCliente"];
        form[1].value = clientes[cod-1]["nomeCliente"];
        form[2].value = clientes[cod-1]["dataCadCli"];
    }
    catch(erro)
    {
        alert("Fim de registro");
    }
}

function NavegaProduto(cod)
{
    try{
        if(cod < 1 || cod > produtos.length)
            throw "Erro";

        let form = document.forms[1];
        form[0].value = produtos[cod-1]["codProduto"];
        form[1].value = produtos[cod-1]["descProduto"];
        form[2].value = produtos[cod-1]["precoProduto"];
        form[3].value = produtos[cod-1]["qtdEstoqueProd"];
    }
    catch(erro)
    {
        alert(erro);
    }
}

let newbtn = document.querySelectorAll(".new");
for(let i = 0; i < newbtn.length; i++)
{
    newbtn[i].addEventListener('click', (button) =>
    {
        let codCliente = Number(clientes[clientes.length-1]["codCliente"]) +1;
        let codProduto = Number(produtos[produtos.length-1]["codProduto"]) +1;
        if(button.target.id == "new-cliente")
        {
            NovoCliente(codCliente);
        }
        else if(button.target.id == "new-produto")
        {
            NovoProduto(codProduto);
        }
    })
}

function NovoCliente(cod)
{
    var data = new Date();
    var dia = data.getUTCDate();
    var mes = data.getUTCMonth() + 1;
    var ano = data.getUTCFullYear();

    let form = document.forms[0];
    form[0].value = cod;
    form[1].value = "";
    form[2].value = dia + "/" + mes + "/" + ano;
}

function NovoProduto(cod)
{
    let form = document.forms[1];
    form[0].value = cod;
    form[1].value = "";
    form[2].value = "";
    form[3].value = "";
}

let savebtn = document.querySelectorAll(".save");
for(let i = 0; i < savebtn.length; i++)
{
    savebtn[i].addEventListener('click', (button) =>
    {
        if(button.target.id == "save-cliente")
        {
            SalvarCliente();
        }
        else if(button.target.id == "save-produto")
        {
            SalvarProduto();
        }
    })
}

function SalvarCliente()
{
    let form = document.forms[0];
    let maiorCod = clientes[clientes.length-1]["codCliente"];

    if(form[0].value <= maiorCod)
    {
        return;
    }

    if(form[1].value == "")
    {
        return;
    }

    let novocliente = {
        "codCliente" : form[0].value,
        "nomeCliente" : form[1].value,
        "dataCadCli" : form[2].value
    }

    clientes.push(novocliente);
    NavegaCliente(1);
}

function SalvarProduto()
{
    let form = document.forms[1];
    let maiorCod = produtos[produtos.length-1]["codProduto"];

    if(form[0].value <= maiorCod)
    {
        return;
    }

    if(form[1].value == "" || form[2].value == "" || form[3].value == "") 
    {
        return;
    }

    let novoproduto = {
        "codProduto"   : form[0].value,
        "descProduto"    : form[1].value,
        "precoProduto" : Number(form[2].value), 
        "qtdEstoqueProd" : Number(form[3].value), 
    }

    produtos.push(novoproduto);
    NavegaProduto(1);
}