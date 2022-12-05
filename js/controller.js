
function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay()
    todoSort(todos)
    const strHTMLs = todos.map(todo => `
    <li class="${(todo.isDone) ? "done" : ""} ${todo.important}"
         onclick="onToggleTodo('${todo.id}')">
         ${(todo.txt)} 
         <div class="todo-date">${todo.time}</div>
         <div class="todo-important">${todo.important}</div>
         <button onclick="onRemoveTodo(event,'${todo.id}')">x</button> 
    </li>` )
    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')

    document.querySelector('.total-todos').innerText = getTotalTodos()
    document.querySelector('.active-todos').innerText = getActiveTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="todo-txt"]')
    const txt = elTxt.value
    if (!elTxt.value) return
    // console.log('txt', txt)
    addTodo(txt)
    elTxt.value = ''
    renderTodos()

}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    var ask = confirm('Are you sure ?')
    if(!ask) return 
    // console.log('Removing', todoId)
    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    // console.log('filterBy', filterBy)
    setFilter(filterBy)
    renderTodos()
}

function onImportanceLevel(ev, value = '1') {
    console.log('entered', ev, value)
    setImportance(value)
}

function todoSort(todos){
    todos.sort((todo1, todo2) => {
        const nameA = todo1.important.toUpperCase()
        const nameB = todo2.important.toUpperCase()
        if (nameA > nameB) {
            return -1
        }
        if (nameA < nameB) {
            return 1
        }
    })
}

function showModal() {
    document.querySelector('.modal').classList.remove('hidden')
}
function hideModal() {
    document.querySelector('.modal').classList.add('hidden')
}