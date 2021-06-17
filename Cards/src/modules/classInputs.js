class Input{
    constructor(typeInput,
                classInput,nameInput,label

    ){this.typeInput=typeInput;
        this.classInput=classInput;
        this.name=nameInput;
        this.label=label
        }
    renderInput(){
        return `<label  class="form-label clear">${this.label}</label>
<input type=${this.typeInput} class="clear ${this.classInput}" name=${this.name}>`

    }

}

function loginForm(){
    const elem1 =new Input("email","form-control","email","Емейл")
    const elem2=new Input("password","form-control","password","Пароль")
    return `${elem1.renderInput()} ${elem2.renderInput()}`
}



function formLogin(){
    const form = document.createElement('div')
    return form.innerHTML=loginForm()
}





export {Input,
    formLogin}