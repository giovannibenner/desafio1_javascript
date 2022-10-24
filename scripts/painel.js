import { clientes } from "../modules/clientes.js";
import { produtos } from "../modules/produtos.js"

const toggleButtons = document.querySelectorAll(".toggle");
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
                    // if(form.id == 'clientes')
                    //     NavegaCliente(1);
                    // else if (form.id == 'produtos')
                    //     NavegaProduto(1);
                    
                    
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

function Navegar(cod, form)
{
    if(cod < 1 )
        AbrirModal("Não existe cliente com código menor");
}

function NavegaCliente(cod)
{
        if(cod < 1 )
            AbrirModal("Não existe cliente com código menor");
        else if( cod > clientes.length)
            AbrirModal("Ultimo cliente atingido");
    
        let form = document.forms[0];
        form[0].value = clientes[cod-1]["codCliente"];
        form[1].value = clientes[cod-1]["nomeCliente"];
        form[2].value = clientes[cod-1]["dataCadCli"];
}

function NavegaProduto(cod)
{
    // if(cod < 1 )
    //     AbrirModal("Não existe produto com código menor");
    // else if( cod > produtos.length)
    //     AbrirModal("Ultimo produto atingido");

    try
    {
        let form = document.forms[1];
        form[0].value = produtos[cod-1]["codProduto"];
        form[1].value = produtos[cod-1]["descProduto"];
        form[2].value = produtos[cod-1]["precoProduto"];
        form[3].value = produtos[cod-1]["qtdEstoqueProd"];
    }
    catch(erro)
    {
        AbrirModal("Limite atingidoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
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