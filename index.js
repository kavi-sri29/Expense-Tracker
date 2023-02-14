
var expenselist = document.querySelector("#expenselist");
var count=0;
var selectedID;
function addExpense(){
    var amount = document.querySelector("#amount").value;
    var descp = document.querySelector("#description").value;
    var category = document.querySelector("#category").value;
    if(document.querySelector("#addExp").innerText === "Update"){
        updateExpense(amount,descp,category)
        return 
    }
    
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
    var editEl = document.createElement("button");
    editEl.innerText = "Edit";
    liele.appendChild(editEl);

    //Axios Implementation
    const expensedata = {
        amount,
        descp,
        category
    }
    axios.post('https://crudcrud.com/api/73f9f8ad60964e40a0df2edaefc13b49/expenseData',expensedata)
    .then( (res) => console.log(res))
    .catch( (err) => console.log(err))
    
}
document.addEventListener("click",function(event){
    var targetEl = event.target;
    if(targetEl.parentElement && targetEl.parentElement.tagName == "LI" && targetEl.innerText == "Delete"){
        expenselist.removeChild(targetEl.parentElement);
        axios.delete(`https://crudcrud.com/api/73f9f8ad60964e40a0df2edaefc13b49/expenseData/${targetEl.parentElement.id}`)
        .then( (res) => console.log(res))
        .catch((err) => console.log(err))
    }
    else if(targetEl.parentElement && targetEl.parentElement.tagName == "LI" && targetEl.innerText == "Edit"){
        
       
      
        document.querySelector("#amount").value = targetEl.parentElement.children[0].innerHTML;
        document.querySelector("#description").value = targetEl.parentElement.children[1].innerHTML;
        document.querySelector("#category").value = targetEl.parentElement.children[2].innerHTML;
        document.querySelector("#addExp").innerText = "Update";
        selectedID = targetEl.parentElement.id;
    }

})

document.addEventListener("DOMContentLoaded",() => {
    axios.get('https://crudcrud.com/api/73f9f8ad60964e40a0df2edaefc13b49/expenseData')
    .then( (res) => loadExpenseData(res.data))
    .catch( (err) => console.log(err))
})

function loadExpenseData(data){

    for(let i=0;i<data.length;i++){
        var amount = data[i].amount; 
        var descp = data[i].descp;
        var category = data[i].category;
    
    var liele = document.createElement("li");
    liele.id = data[i]._id;
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
    var editEl = document.createElement("button");
    editEl.innerText = "Edit";
    liele.appendChild(editEl);
}
}

function updateExpense(amount,descp,category){
    const expdata = {
        amount,
        descp,
        category
    }
    axios.put(`https://crudcrud.com/api/73f9f8ad60964e40a0df2edaefc13b49/expenseData/${selectedID}`,expdata)
    .then( (res) => console.log(res))
    .catch( (err) => console.log(err))
}