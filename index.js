
var expenselist = document.querySelector("#expenselist");
var count=0;
function addExpense(){
    var amount = document.querySelector("#amount").value;
    var descp = document.querySelector("#description").value;
    var category = document.querySelector("#category").value;
    var liele = document.createElement("li");
    liele.id = count++;
    var amountspan = document.createElement("span");
    var desspan = document.createElement("span");
    var categoryspan = document.createElement("span");
    amountspan.innerText = amount;
    desspan.innerText = descp;
    categoryspan.innerText = category;
    liele.appendChild(amountspan);
    liele.appendChild(desspan);
    liele.appendChild(categoryspan);
    expenselist.appendChild(liele);
    var deleteEl = document.createElement("button"); 
    deleteEl.innerText = "Delete";
    liele.appendChild(deleteEl);

}
document.addEventListener("click",function(event){
    var targetEl = event.target;
    if(targetEl.parentElement && targetEl.parentElement.tagName == "LI"){
        expenselist.removeChild(targetEl.parentElement);
    }
})