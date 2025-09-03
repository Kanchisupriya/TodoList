let unOrdList = document.getElementById("todoListContainer");
let addButton = document.getElementById("addToDoButton");
let saveButton = document.getElementById("saveToDoButton");


function gettodoListfromLocalStorage(){
    let stringifiedString = localStorage.getItem("todos");
    let parsedItem = JSON.parse(stringifiedString);
    if (parsedItem === null){
        return [];
    }
    else{
        return parsedItem;
    }
}

let todoList = gettodoListfromLocalStorage();
let todoCount = todoList.length;


saveButton.onclick = function(){
    localStorage.setItem("todos", JSON.stringify(todoList));
}

function createTodo(newtodo){
    let task = newtodo.task;
    let taskId = newtodo.taskId;

    let listEl = document.createElement('li');
    unOrdList.appendChild(listEl);
    listEl.classList.add( "todo-item-container","d-flex", "flex-row");

    let inputEl = document.createElement('input');
    inputEl.type = "checkbox";
    inputEl.id = "checkbox" + taskId;
    inputEl.checked = newtodo.isChecked;
    listEl.appendChild(inputEl);

    let labelContainer = document.createElement('div');
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    listEl.appendChild(labelContainer);

    let labelEl = document.createElement('label');
    labelEl.textContent = task;
    labelEl.classList.add("checkbox-label");
    labelEl.setAttribute("for", "checkbox"+ taskId);
    if(newtodo.isChecked === true){
        labelEl.classList.add("checked");
    }
    labelContainer.appendChild(labelEl);

    let dltIconContainer = document.createElement('div');
    dltIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(dltIconContainer);

    let dltIcon = document.createElement('i');
    dltIcon.classList.add("far", "fa-trash-alt", "delete-icon","text-right");
    dltIconContainer.appendChild(dltIcon);

    dltIconContainer.onclick = function(){
        unOrdList.removeChild(listEl);

        let index = todoList.findIndex(function(item){
            if (item.taskId === taskId){
                return true;
            }
            else{
                return false;
            }
        });

        todoList.splice(index, 1);
    }

    inputEl.onclick = function(){
        labelEl.classList.toggle("checked");

        let index = todoList.findIndex(function(item){
            if(item.taskId === taskId){
                return true;
            }
            else{
                return false;
            }
        })
        let indexElement = todoList[index];
        if (indexElement.ishChecked === true){
            indexElement.isChecked = false;
        }
        else{
            indexElement.isChecked = true;
        }
    }

    

}

addButton.onclick = function(){
    let inputEl = document.getElementById("InputElement");
    let inputElValue = inputEl.value;

    if (inputElValue===""){
        alert("Enter valid input!!");
        return;
    }
    let newtodo={
        task : inputElValue,
        taskId : todoCount,
        isChecked : false
    }
    todoList.push(newtodo);
    createTodo(newtodo);
    inputEl.value = "";
    todoCount = todoCount + 1;
    
}
for (let i of todoList){
    createTodo(i);
}
