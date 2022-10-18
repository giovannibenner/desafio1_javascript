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

// function Toggle(id)
// {
//     let active = document.forms;
    
//     let form = document.getElementById(id);
    
//     if(form.classList.contains("hidden"))
//     {
//         if(form.id == 'clientes')
//             IniciaCliente();
//         else if (form.id == 'produtos')
//             IniciaProdutos();

//         for(forms of active)
//         {
//             forms.classList.add("hidden");
//             forms.classList.remove("visible");
//         }
        
//         form.classList.add("visible");
//         form.classList.remove("hidden");
//     }
//     else
//     {
//         form.classList.add("hidden");
//         form.classList.remove("visible");
//     }
// }

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