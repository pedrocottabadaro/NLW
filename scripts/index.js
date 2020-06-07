const modal =document.querySelector("#modal");
const buttonSearch=document.querySelector("#page-home main a");
const botaoX=document.querySelector("#modal .header a");

buttonSearch.addEventListener("click",()=>{
    modal.classList.remove("hide");
})

botaoX.addEventListener("click",()=>{
    modal.classList.add("hide");
})

