const validate_button = document.querySelector(".validate-button");
const log = document.querySelector(".log");

validate_button.addEventListener('click', function()
{
    fetch('usuario.json')
    .then((response) => response.json())
    .then((data) => {

        let username = document.getElementById("user").value;
        let password = document.getElementById("password").value;
        let validate = false;
        data["users"].forEach(user => {
            if(user.user == username  && user.pws == password)
            {
                validate = true;

                log.style.color = 'green';
                log.innerHTML = "Sucesso";

                let form = document.getElementById('login');
                form.submit();
            }
        }
        );
    
        if(!validate)
        {
            log.style.color = 'red';
            log.innerHTML = "Credenciais erradas"
            return;
        }
    })
});