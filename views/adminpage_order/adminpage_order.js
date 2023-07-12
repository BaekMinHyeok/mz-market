const deleteBtn = document.querySelector("#deleteBtn");

deleteBtn.addEventListener("click",function(){
    const trElement = this.parentNode.parentNode;
    trElement.remove();
});