const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'
var gImportance = 'a-level'

_createTodos()

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos

    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')
}

function addTodo(txt) {
    hideModal()
    const todo = _createTodo(txt)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)

}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)
    if(gTodos.length < 1) showModal()
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setImportance(value){
    gImportance = value
}

function getTotalTodos() {
    return (gTodos.length) ? gTodos.length : 'No Todos'
}

function getActiveTodos() {
    const length = gTodos.filter(todo => !todo.isDone).length
    return (length > 0) ? length : 'No active Todos' 
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML' , _getTime()),
            _createTodo('Study CSS', _getTime()),
            _createTodo('Master JS', _getTime()),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

function _createTodo(txt) {
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        time: _getTime(),
        important: gImportance
    }
}



function _getTime() {
    var date = new Date()
    return `${date.getHours()}:${date.getMinutes()}`
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}