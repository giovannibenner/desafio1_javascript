import { clientes } from "../modules/clientes.js";
import { produtos } from "../modules/produtos.js"

const toggleButtons = document.querySelectorAll(".toggle");
const navigateButtons = document.querySelectorAll(".prev-next");
const forms = document.forms;
// const formClientes = document.querySelector("#clientes");
// const formProdutos = document.querySelector("#produtos");
// const formPedidos = document.querySelector("#pedidos");

for(let i of toggleButtons)
{
    i.addEventListener('click', (e) => {
        for(let j of forms)
        {
            if(e.target.id.includes(j.id) || e.target.parentElement.parentElement.id.includes(j.id))
            {
                let form = document.getElementById(j.id);
                
                if(form.classList.contains("hidden"))
                {
                    if(j.id != 'pedidos')
                        Navigate(1, form);
                    
                    for(let k of forms)
                        k.classList.add("hidden");

                    form.classList.remove("hidden");
                }
                else
                    form.classList.add("hidden");
            }
        }
    })
}

for(let i of navigateButtons)
{
    i.addEventListener('click', (e) =>
    {
        console.log(e.target.form[0].value)
        if(e.target.classList.contains("prev"))
            Navigate(Number(e.target.form[0].value) -1, e.target.form)
        else /*if(e.target.classList.contains("next"))*/
            Navigate(Number(e.target.form[0].value) +1, e.target.form)
    })
}

function Navigate(cod, form)
{
    console.log(cod)
    if(cod < 1 )
        AbrirModal("Não existe menor");

    //@temp - pode ter o conteudo de clientes ou de produtos dependendo do form do parametro;
    let temp = eval(form.id)

    if(cod > temp.length)
        AbrirModal("Ultimo atingido");
    
    temp = temp[cod-1]

    let i = 0;
    for(let j in temp)
    {
        form[i].value = temp[j];
        i++;
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

let idCliente = document.forms[2];
idCliente[0].addEventListener('focusout', (event) => {
    if(idCliente[0].value >= clientes.lenght || idCliente[0] < 1)
        console.log("erro");
    else
        idCliente[1].value = clientes[event.target.value -1]["nomeCliente"];
});

let idProduto = document.forms[2];
idProduto[2].addEventListener('focusout', (event) => {
    idProduto[3].value = produtos[event.target.value -1]["descProduto"];
    idProduto[4].value = produtos[event.target.value -1]["precoProduto"];
});

let pedido = document.getElementById("insere-pedido");
pedido.addEventListener('click', function(){
    InsereProduto();
});

function InsereProduto()
{
    let table = document.querySelector("table");
    let linha = table.insertRow(table.rows.length-1);
    linha.classList.add("line");

    let item = linha.insertCell(0);
    let desc = linha.insertCell(1);
    let preco = linha.insertCell(2);
    let qtd = linha.insertCell(3);
    let sub_total = linha.insertCell(4);

    let form_pedido = document.forms[2];
    item.innerHTML = form_pedido[2].value;
    desc.innerHTML = form_pedido[3].value;
    preco.innerHTML = form_pedido[4].value;
    qtd.innerHTML = form_pedido[5].value;
    sub_total.innerHTML = (Number(form_pedido[5].value) * Number(preco.innerHTML)).toFixed(2);

    let total = document.getElementById("total");
    total.innerHTML = (Number(total.innerHTML) + Number(sub_total.innerHTML)).toFixed(2);
}

function AbrirModal(texto)
{
    const modal = document.getElementById("modal");
    const text = modal.children[0];
    const close_button = modal.children[1];

    text.innerHTML = texto;

    modal.showModal();
    close_button.addEventListener('click', function()
    {
        modal.close();
    })
}