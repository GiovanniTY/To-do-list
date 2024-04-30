//Array container for task
let todoList = [];

//Function to add a new task
function addTask(taskName) {
    const newTask = {
        id: Date.now(),
        name:taskName,
        completed: false 
    };
    //Add the new task to the array
    todoList.push(newTask);

    //Call the function to update the tasks display
    updateTaskDisplay();

}

//Function to update the tasks display in the HTML
function updateTaskDisplay() {
    //select the <ul> element that contains the task list
    const taskListElement = document.getElementById('taskList');

    //Clear the list content to avoid duplicates
    taskListElement.innerHTML = '';
    //Iterate over the tasks array and add each task to the list
    todoList.forEach((task) => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            saveTaskToLocalStorage();
            updateTaskDisplay();
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click',() => {
        //Remove the task of list 
        todoList= todoList.filter(item => item.id !== task.id);
        updateTaskDisplay();
        });
        // Check if the task is completed and add appropriate styling
        if (task.completed) {
            listItem.classList.add('completed-task');
        }
        
        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(task.name));
        listItem.appendChild(deleteButton);
        taskListElement.appendChild(listItem);
    });
}

//Event listener for the submit button to add new tasks
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click',() =>{
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim(); //Remove any leading or trailing whitespace
    if (taskName !== '') {
        //Add the task only if the input field is not empty
        addTask(taskName);
        taskInput.value = ''; //Clear the input field after adding the task
    }
});
//Update the tasks display when the application starts
updateTaskDisplay();



//Function to save the todo list to local storage
function saveTaskToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
// Function to load the todo list from local storage
function loadTasksFromLocalStorage(){
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList) {
        todoList = JSON.parse(storedTodoList);
        updateTaskDisplay();
        console.log('Todo list loaded from localStorage:', todoList);
    } else {
        console.log('No todo list found in localStorage');
}
}
// add an event that triggers when the page is loaded
window.addEventListener('load',()=>{
    loadTasksFromLocalStorage();
});

//Add an event that triggers when a new task is addes , completed, or deleted
window.addEventListener('beforeunload',()=> {
    saveTaskToLocalStorage();
});

//Event listener for the buton "Delete completed Tasks"
const deleteCompletedButton = document.getElementById('delete-completed-button');
deleteCompletedButton.addEventListener('click',() => {
    // Filter only uncompleted tasks and overwrite the todoList array
    todoList = todoList.filter(task => !task.completed);
    //Update 
    updateTaskDisplay();

});

//Select the task input element 
const taskInput = document.getElementById('taskInput');

//Add event listener for keypress event
taskInput.addEventListener('keydown',(event) => {
    //Check if the enter Key is pressed (keyCode 13)
    if (event.Keycode === 13 || event.key === "Enter") {
        //Prevent the default action (form submission)
        event.preventDefault();
        //Trigger the click event on the submit button
        submitButton.click();
    }
});