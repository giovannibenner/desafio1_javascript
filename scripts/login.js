function ValidarLogin()
{
    fetch('usuario.json')
    .then((response) => response.json())
    .then((data) => {
        // console.log(data["users"])

        let username = document.getElementById("user").value;
        let password = document.getElementById("password").value;

        let validate = false;
        data["users"].forEach(user => {
            if(user.user == username)
            {
                if(user.pws == password)
                {
                    validate = true;
                    return;
                }
            }
        }
        );
        
        try
        {
            if(validate)
            {
                let form = document.getElementById('login');
                form.action = "painel.html";
                form.submit();
            }
            else
            {
                throw "Credenciais Erradas";
            }
        }catch(erro)
        {
            console.log(erro);
            alert(erro);
        }
    })

}

