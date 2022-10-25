import { clientes } from "../modules/clientes.js";
import { produtos } from "../modules/produtos.js"

const toggle_buttons = document.querySelectorAll(".toggle");
const navigate_buttons = document.querySelectorAll(".navigate");
const new_buttons = document.querySelectorAll(".new");
const save_buttons = document.querySelectorAll(".save");
const forms = document.forms;

for(let i of toggle_buttons)
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

for(let i of navigate_buttons)
{
    i.addEventListener('click', (e) =>
    {
        if(e.target.classList.contains("prev"))
            Navigate(Number(e.target.form[0].value) -1, e.target.form)
        else /*if(e.target.classList.contains("next"))*/
            Navigate(Number(e.target.form[0].value) +1, e.target.form)
    })
}

for(let i of new_buttons)
{
    i.addEventListener('click', (e) =>
    {
        let form = e.target.form;
        let pos = eval(form.id).length;
        let temp = eval(form.id)[pos-1];
        for(let i in temp)
        {
            Novo(Number(temp[i])+1, form, Object.keys(temp).length)
            break;
        }
    })
}

for(let i of save_buttons)
{
    i.addEventListener('click', (e) =>
    {
        let form = e.target.form;
        let pos = eval(form.id).length;
        let temp = eval(form.id)[pos-1]

        Save(form, Object.keys(temp).length);
    })
}

function Navigate(cod, form)
{
    try
    {
        if(cod < 1 )
            throw `Não existe ${form.id.substring(0, form.id.length-1)} com codigo menor`
    
        //@temp - pode ter o conteudo de clientes ou de produtos dependendo do form do parametro;
        let temp = eval(form.id)
    
        if(cod > temp.length)
            throw `Ultimo ${form.id.substring(0, form.id.length-1)} atingido`
        
        temp = temp[cod-1]
    
        let i = 0;
        for(let j in temp)
        {
            form[i].value = temp[j];
            i++;
        }
    }
    catch(err)
    {
        AbrirModal(err);
    }
}

function Novo(cod, form, length)
{
    for(let i = 0; i < length; i++)
    {
        form[i].value = ""
        if(form[i].name == 'dataCadCli')
        {
            var data = new Date();
            var dia = data.getUTCDate();
            var mes = data.getUTCMonth() + 1;
            var ano = data.getUTCFullYear();
            form[i].value = dia + "/" + mes + "/" + ano;
        }
    }
    form[0].value = cod;
}

function Save(form, length)
{
    try
    {
        let temp = eval(form.id);
        let cod = form[0].value

        if(cod <= Number(temp[temp.length-1][Object.keys(temp[temp.length-1])[0]]))
            throw `Esse ${form.id.substring(0, form.id.length-1)} ja existe, crie outro pelo botao NOVO`
    
        let aux = {};
        for(let i =0; i < length; i++)
        {
            if(form[i].value == "")
                throw "Não é permitido campos vazios"

            aux[form[i].name] = form[i].value;
        }
    
        eval(form.id).push(aux);
        Navigate(1, form);
    }
    catch(err)
    {
        AbrirModal(err);
    }
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