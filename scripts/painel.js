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
                IniciaCliente(form);
            else if (form.id == 'produtos')
                IniciaProdutos(form);
    
            for(let forms of active)
            {
                forms.classList.add("hidden");
                forms.classList.remove("visible");
            }
            
            form.classList.add("visible");
            form.classList.remove("hidden");
        }
        else
        {
            form.classList.add("hidden");
            form.classList.remove("visible");
        }
    })
}


// Quebra galho por enquanto, refatorar demais
let x = document.querySelectorAll(".x-button");
for(let i = 0; i < x.length; i++)
{
    x[i].addEventListener('click', function()
    {
        x[i].parentElement.parentElement.classList.add("hidden");
        x[i].parentElement.parentElement.classList.remove("visible");
    })
}

function IniciaCliente(form)
{
    form[0].value = clientes[0].codCliente;
    form[1].value = clientes[0].nomeCliente;
    form[2].value = clientes[0].dataCadCli;
}

function IniciaProdutos(form)
{
    form[0].value = produtos[0].codProduto;
    form[1].value = produtos[0].descProduto;
    form[2].value = produtos[0].precoProduto;
    form[3].value = produtos[0].qtdEstoqueProd;
}

let prev_next = document.querySelectorAll(".prev-next");
console.log(prev_next);
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
    console.log(cod)
    try{
        if(cod < 1 || cod > clientes.lenght)
            throw "Erro";
    
        let form = document.forms[0];
        form[0].value = clientes[cod-1]["codCliente"];
        form[1].value = clientes[cod-1]["nomeCliente"];
        form[2].value = clientes[cod-1]["dataCadCli"];
    }
    catch(erro)
    {
        alert(erro);
    }
}

function NavegaProduto(cod)
{
    console.log(cod)
    try{
        if(cod < 1 || cod > produtos.length)
            throw "Erro";

        let form = document.forms[1];
        console.log(form)
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