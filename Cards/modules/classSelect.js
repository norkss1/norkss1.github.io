class Select {
    constructor(classSelect,nameSelect,stringSelect){
        this.classSelect=classSelect;
        this.nameSelect=nameSelect;
        this.stringSelect=stringSelect
}
    renderSelect(){
        const comma= ','
        const arrayString=this.stringSelect.split(comma)

 return `<select   class="${arrayString[4]} ${this.classSelect}" name=${this.nameSelect} >
            <option selected >${arrayString[0]}</option>
            <option value="${arrayString[1]}">${arrayString[1]}</option>
            <option value="${arrayString[2]}">${arrayString[2]}</option>
            <option value="${arrayString[3]}">${arrayString[3]}</option>
        </select> 
`    }
}



export  {Select}