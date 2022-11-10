// SELECT ELEMENTS
const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");
const todotypeInput = document.getElementById("newtodotype");
const todoListEl =document.querySelector(".task-list");
const todocheck =document.getElementById("#checked");

//  USE ARRAY TO SAVE TODO
 let todos = JSON.parse(localStorage.getItem('todos')) || [];
 let EditTodoId = -1 ;


 isEditTask = false;
 // 1st render
renderTodo();
// FORM SUBMIT
form.addEventListener('submit', function (event){
   event.preventDefault();
   
   saveTodo();
   renderTodo();
});

// SAVE TODO
function saveTodo(){
 let todovalue =todoInput.value;
 let todotypevalue =todotypeInput.value;
  
//  check if the todo is empty

const isEmpty = todovalue === '';

// check for duplicate to do
const isDuplicate = todos.some((todo)=> todo.value.toUpperCase() === todovalue.toUpperCase());


if(isEmpty){
    alert("todo's input is empty");
}
  else if(isDuplicate){
    alert("todo already exist");
  }
  else {
    if (EditTodoId >= 0) {
        const editTodo = (todo, index) => {
            if (index === EditTodoId) {
                todo.value = todovalue;
                todo.valuetype = todotypevalue;
            }

            return todo
        }
        todos = todos.filter(editTodo);
        EditTodoId = -1 ;
    }

    else{
        const todo ={
            value: todovalue,
            valuetype: todotypevalue,
             checked:false,
             color: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase()
            
          };
          todos.push(todo);
    }

   

    

      todoInput.value = ' ';
      todotypeInput.value = ' ';
    }
}

// RENDER TODO
function renderTodo(){
    // clear element before re-render
    todoListEl.innerHTML = '';

    // render todo
    todos.forEach((todo, index)=>{
     todoListEl.innerHTML += `
     <div class="task" id=${index}>
     <i class="fas fa-sticky-note"></i>
     <span class="task-number ${todo.checked ? 'checked' : '' }" data-action="check">${todo.value}</span><br>
     <span  data-action="check" class="task-status" style="font-size: 10px;">${todo.valuetype}</span>
       <i class=" bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle' }"
       style="color: ${todo.color}"
       data-action="check"></i>
       <div class="action-p">
         <div class="action1"></div>
         <div class="action1"></div>
         <div class="action1"></div>
         <ul class="menu">
             <li onclick='editTodo(${index}, "${todo.value}","${todo.valuetype}")'  title="to edit just click on add todo button after click here"><i class="fa-regular fa-pen-to-square" data-action="edit" ></i> <span style="color:#ffffff" class="myBtn">edit</span> </li>
             <li onclick='deleteTask(${index}, "${todo}")' ><i class="fa-solid fa-trash" data-action="delete"></i> <span  style="color:#ffffff">delete</span></li>
         </ul>
     </div>
 </div>
 <hr /> `
    });
    }

    // create event listeners for all todos
    todoListEl.addEventListener('click', (event)=>{
        const target = event.target;
        const parentElement = target.parentNode;

        if(parentElement.className !== 'task') return;

        // id checktodo
           let todo = parentElement;
           let todoId = Number(todo.id);

// target
  let action = target.dataset.action;

  action === 'check' && checkTodo(todoId);
//  
    })
    // CHECK A TODO
function checkTodo(todoId) {
    todos = todos.map((todo, index) => ({
      ...todo,
      checked: index === todoId ? !todo.checked : todo.checked,
    
    }));
    renderTodo();
  
  }

  // EDIT A TODO
  function editTodo(todoId) {
    todoInput.value = todos[todoId].value;
    todotypeInput.value= todos[todoId].value;
    EditTodoId = todoId;

    // re-render
    renderTodo();
  
}
  
// DELETE TODO
function deleteTask(todoId) {
    todos = todos.filter((todo, index) => index !== todoId);
    EditTodoId = -1;

    // re-render
    renderTodo();
}


// const onEditClick = () => {
//     // get values of an item to be edited
//     const valueToEdit = document.querySelector('#');
//     const valueTypeToEdit = document.querySelector('#');

//     // get reference to editor inputs
//     const valueInput = document.querySelector('#');
//     const valueTypeInput = document.querySelector('#');

//     // assing values to the editor inputs
//     valueInput.target.value = valueToEdit.value;
//     valueTypeInput.target.value = valueTypeToEdit.value;

// }



/**
 * 1. write down process flow
 * 2. write pseudo code
 * 3. identify your tools
 * 3. solve your problem
 * 
 * Problem: edit todo
 * 
 * 1. get the original list of todos
 * 2. find your todo in that list by comparing ids
 * 3. modify the values of that item
 * 4. return the final modified list
 * */ 