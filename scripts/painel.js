function Toggle(id)
{
    let active = document.forms;

    
    let form = document.getElementById(id);
    
    if(form.classList.contains("hidden"))
    {
        for(forms of active)
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
    
}