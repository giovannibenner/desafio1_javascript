import { clientes } from "../modules/clientes.js";
import { produtos } from "../modules/produtos.js"

const toggle_buttons = document.querySelectorAll(".toggle");
const navigate_buttons = document.querySelectorAll(".navigate");
const new_buttons = document.querySelectorAll(".new");
const save_buttons = document.querySelectorAll(".save");
const cliente_input = document.getElementById("pedido-cliente");
const produto_input = document.getElementById("pedido-produto"); 
const insere_button = document.getElementById("insere-pedido"); 
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
        else
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
            New(Number(temp[i])+1, form, Object.keys(temp).length)
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

cliente_input.addEventListener('focusout', (e) => {
    let nomecliente_input = document.getElementById("pedido-nomecliente");
    try
    {
        if(cliente_input.value >= clientes.lenght || cliente_input < 1)
            throw "";

        nomecliente_input.value = clientes[e.target.value -1]["nomeCliente"];
    }
    catch(err)
    {
        if(e.target.value != "")
            AbrirModal("Cliente não existente");
    }
});

produto_input.addEventListener('focusout', (e) => {
    try
    {
        let pedido_form = forms[2];
        pedido_form[3].value = produtos[e.target.value -1]["descProduto"];
        pedido_form[4].value = produtos[e.target.value -1]["precoProduto"];
    }
    catch(err)
    {
        if(e.target.value != "")
            AbrirModal("Produto não existente");
    }
});

insere_button.addEventListener('click', (e) => {
    let form = e.target.form;
    InsereProduto(form);
});

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

function New(cod, form, length)
{
    for(let i = 0; i < length; i++)
    {
        form[i].value = ""
        if(form[i].name == 'dataCadCli')
        {
            let data = new Date();
            let dia = data.getUTCDate();
            let mes = data.getUTCMonth() + 1;
            let ano = data.getUTCFullYear();
            form[i].value =  dia + "/" + mes + "/" + ano;
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

function InsereProduto(form)
{
    for(let i = 0; i < form.length-1; i++)
    {
        if(form[i].value == "")
        {
            AbrirModal("Campo vazio não permitido");
            return;
        }
    }

    let table = document.querySelector("table");
    for(let i of table.rows)
    {
        if(produto_input.value == i.cells[0].textContent)
        {
            AbrirModal("Esse produto ja está em uso em algum pedido");
            return;   
        }
    }

    let row = table.insertRow(table.rows.length-1);
    row.classList.add("line");

    let item = row.insertCell(0);
    let desc = row.insertCell(1);
    let preco = row.insertCell(2);
    let qtd = row.insertCell(3);
    let sub_total = row.insertCell(4);

    item.innerHTML = form[2].value;
    desc.innerHTML = form[3].value;
    preco.innerHTML = form[4].value;
    qtd.innerHTML = form[5].value;
    sub_total.innerHTML = (Number(form[5].value) * Number(preco.innerHTML)).toFixed(2);

    let total = document.getElementById("total");
    total.innerHTML = (Number(total.innerHTML) + Number(sub_total.innerHTML)).toFixed(2);
}

function AbrirModal(text_aux)
{
    const modal = document.getElementById("modal");
    const text = modal.children[0];
    const close_button = modal.children[1];

    text.innerHTML = text_aux;

    modal.showModal();
    close_button.addEventListener('click', function()
    {
        modal.close();
    });
}