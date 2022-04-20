// Formdan gelen verileri atacağımız liste
let todoItems = [];

const todoStorage = localStorage.getItem('todoItems')

const todoListEl = document.querySelector('.todo__list')

if(JSON.parse(todoStorage)) {
    todoItems = [...JSON.parse(todoStorage)]
}

// ekleme butonuna tıkladığında elemana ulaşmak
const todoModalEl = document.querySelector('.todo-modal')

const toggleModal = () => {
    todoModalEl.classList.toggle('show')
}

todoModalEl.addEventListener('click',(e) => {
    if(e.target.classList.contains('todo-modal')) toggleModal()
})

// unique bir id değeri üretmek
const uniqueIdGenerator = () => {
    return Math.round(Math.random() * 100000 +1)
}

// ekleme olayları
const addToDoHtml = (todoItem) => {
    let todoItemHtml = `<li class="todo__item 
    ${todoItem.isComplete ? 'complete' : ''}  ">

    <div class="todo__complete btn" data-id="${todoItem.id}" onclick="toggleTodoComplete(this)">
        <img src="./img/checked.svg">
    </div>
    <div class="todo__info">
        <span class="todo__info-title">${todoItem.title}</span>
        <span class="todo__info-desc">${todoItem.desc}</span>
    </div>
    <img class="btn" src="./img/delete.png" data-id="${todoItem.id}" onclick="removeTodoItem(this)">
</li>`

 todoListEl.insertAdjacentHTML('beforeend', todoItemHtml)
}

// local storage kaydetme
const saveTodoItemsToLS = () => {
    localStorage.setItem('todoItems', JSON.stringify(todoItems))
}

// eleman ekleme
const addToDoItems = () => {
    if(todoListEl.innerHTML != "") todoListEl.innerHTML=""
    const title = document.querySelector("input[name='title']").value
    const desc = document.querySelector("textarea[name='desc']").value
    const addedTodoItem = { 
        id: uniqueIdGenerator(),  
        title, 
        desc, 
        isComplete: false 
    }
    document.querySelector('#addTodoForm').reset()
    addToDoHtml(addedTodoItem)
    todoItems.push(addedTodoItem)
    saveTodoItemsToLS()
    toggleModal()
}

// seçilen iş bittikten sonra checked ile üzerini çizme metodu.
const toggleTodoComplete = (selectedEl) => {
    const toggleItemIndex =  todoItems.findIndex(todo => todo.id == selectedEl.dataset.id)

        todoItems[toggleItemIndex].isComplete = !todoItems[toggleItemIndex].isComplete
        selectedEl.parentNode.classList.toggle("complete")
        saveTodoItemsToLS()
    
}

// henüz hiç bir şey eklenmediğinde gerçekleşecek olay
const noneTodoItems =  () => {
    const notFoundItem = ` <li class="none-todos">
        Henüz bir şey eklemediniz...
    </li> `
        todoListEl.insertAdjacentHTML("beforeend", notFoundItem)  
}

// eleman silme
const removeTodoItem = (removedEl) => {
    const removedItemIndex = todoItems.findIndex(todo => todo.id == removedEl.dataset.id)

    if(removedItemIndex !== -1){
        todoItems.splice(removedItemIndex, 1)
        removedEl.parentNode.remove()
        saveTodoItemsToLS()
        if(todoItems.length == 0){
            noneTodoItems()
        }
    }
}

const listTodoItems = () => {
    if(todoItems.length > 0){
        todoItems.forEach(todo => {
            addToDoHtml(todo)
        })
    }else {
        noneTodoItems()
        
    }
    
}
listTodoItems()



