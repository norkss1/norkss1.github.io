class Textarea{
    constructor(rows,cols,name,label,classTextarea) {
        this.rows=rows;
        this.cols=cols;
        this.name=name;
        this.label=label
        this.class=classTextarea
    }
    renderTextarea(){
        return`  <label  class="form-label clear">${this.label}</label>
  <textarea rows=${this.rows} class=${this.class} cols=${this.cols} name=${this.name}></textarea>`
    }
}




export  {Textarea }