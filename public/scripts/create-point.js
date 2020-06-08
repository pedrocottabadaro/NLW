
populateUFs();

function populateUFs(){
    const ufSelect=document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    ).then(res=>res.json()).then(states=>{
        for (const state of states) {
            ufSelect.innerHTML+=`<option value="${state.id}">${state.nome}</option>`;
        }
    })
}

function getCities(event){
    
    const citySelect=document.querySelector("select[name=city]");
  
    const stateInput=document.querySelector("input[name=state]");
    const ufValue=event.target.value;
    const indexOfSelectedState=event.target.selectedIndex;
    stateInput.value=event.target.options[indexOfSelectedState].text;
    citySelect.innerHTML=`<option value="">Selecione a cidade</option>`;
    citySelect.disabled=true;
    const url=`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    
    
    fetch(url).then(res=>res.json()).then(cities=>{
        citySelect.innerHTML=`<option value="">Selecione a cidade</option>`;
        for (const city of cities) {
            citySelect.innerHTML+=`<option value="${city.nome}">${city.nome}</option>`;
        }
        citySelect.disabled=false;
    })
}


document.querySelector("select[name=uf]").addEventListener("change",getCities);


const itemsToColect=document.querySelectorAll(".items-grid li");

for (const item of itemsToColect) {
    item.addEventListener("click",handleSelectedItem)
}
const collectedItems=document.querySelector("input[name=items]");

let selectedItems=[];

function handleSelectedItem(event){
    const itemLi=event.target;
    //pode ser .add ou .remove se quiser
    itemLi.classList.toggle("selected");
    const itemId=itemLi.dataset.id;
    
    const alreadySelected=selectedItems.findIndex(item=>
        item==itemId
    )

    console.log(alreadySelected);

    if(alreadySelected>=0){
        const filteredItems=selectedItems.filter(item=>
            item!=itemId
            )

            selectedItems=filteredItems;
    }
    else{
        selectedItems.push(itemId);
    }
  
    
    collectedItems.value=selectedItems;

}