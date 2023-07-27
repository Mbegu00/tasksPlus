//obtenemos los datos cuando se envia el formulario
document.getElementById('form').addEventListener('submit', (e)=>{
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const datetimeInput = document.getElementById("datetime").value
    const prioridadSelect = document.getElementById("prioridadSelect").value
    //lo gurdamos en un objeto
    const task = {
        title,
        description,
        datetimeInput,
        prioridadSelect,
    }
    //que cuando se carga los datos se limpia nuevamente los inputs
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById("datetime").value = '';
    document.getElementById("prioridadSelect").value = 'Prioridad';

    if(localStorage.getItem('tasks') === null){ //si esta vacio crealas
        let tasks = []
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }else{ //si ya existen obtienes lo actualizas y lo envias de nuevo
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    getTask()
    e.preventDefault()
})

function getTask(){
    const divShow = document.getElementById('divShow')
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    divShow.innerHTML = ''
    //iteramos para obtener los datos del localStorage
    for(let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title
        let description = tasks[i].description
        let datetimeInput = tasks[i].datetimeInput
        let prioridadSelect = tasks[i].prioridadSelect
        //y lo mostramos los datos 
        divShow.innerHTML += `
            <div>
                <p>${title} - <span class="priority" data-priority="${prioridadSelect}">
                    ${prioridadSelect}
                </span></p>
                <p>${description}</p> 
                <p>${datetimeInput}</p>
                <a class="dele-boton" onClick="deleteTasks('${title}')">Delete</a> 
            </div>`
    }
}

function deleteTasks(title){
    let delet = JSON.parse(localStorage.getItem('tasks'))
    for(let i = 0; i < delet.length; i++){
        if(delet[i].title == title){
            delet.splice(i, 1) //eliminas solo uno
        }
        localStorage.setItem('tasks', JSON.stringify(delet))
        getTask()
    }
}

getTask()
