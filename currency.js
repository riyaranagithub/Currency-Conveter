const base_URL= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let fromcurr=document.querySelector(".from select")
let tocurr=document.querySelector(".to select")
let msg=document.querySelector(".msg")
let dropdown = document.querySelectorAll(".drop-down select")
const btn=document.querySelector("form button")
for(let select of dropdown){
    for(currcode in countryList){
        let newoption = document.createElement("option")
        newoption.innerText=currcode
        newoption.value=currcode
        select.append(newoption)
        if(select.name=="from"&&currcode=="USD"){
            newoption.selected="selected"
        }
        else if(select.name=="to"&&currcode=="INR"){
            newoption.selected="selected"
        }
        
    }
    select.addEventListener("change",(evt)=>{
    upgrade(evt.target);
})
}

function upgrade(element){
    let currcode=element.value
    let countcode=countryList[currcode]
    let newsrc=`https://flagsapi.com/${countcode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src=newsrc
}
const updateexchangerate = async()=>{
 let amount = document.querySelector(".amount input")
    let amountVal = amount.value;
    if(amountVal===""||amountVal<"1"){
        amountVal=1
        amount.value=1
    }
    const url=`${base_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`
    let response= await fetch(url)
    let data= await response.json()
    let rate = await data[tocurr.value.toLowerCase()];
    console.log(rate)
    let finalVal=amountVal*rate
    msg.innerText=`${amountVal} ${fromcurr.value} = ${finalVal} ${tocurr.value}`
     
}
btn.addEventListener('click',async(evt)=>{
    evt.preventDefault();
    
})
window.addEventListener('load',()=>{
    updateexchangerate();
})