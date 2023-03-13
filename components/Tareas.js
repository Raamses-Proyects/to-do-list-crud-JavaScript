import { llenarInputs, ListaTareas, limpiarObjeto } from '../js/app.js'
import { sincronizarStorage, limpiarForm, formatearFecha } from '../helpers/helpers.js'
import { TAREAS } from '../constantes/consts.js'


function Tareas({id, fecha, hora, tarea}) {
    const li = document.createElement('li')
    
    const divTareasDatos = document.createElement('div')
    divTareasDatos.classList.add('tareas__datos')
    
    const parrafoFecha = document.createElement('p')
    parrafoFecha.classList.add('tareas__texto')
    const spanFecha = document.createElement('span')
    spanFecha.classList.add('tareas__span')
    spanFecha.textContent = formatearFecha(fecha)
    parrafoFecha.appendChild(spanFecha)

    const parrafoHora = document.createElement('p')
    parrafoHora.classList.add('tareas__texto')
    const spanHora = document.createElement('span')
    spanHora.classList.add('tareas__span')
    spanHora.textContent = hora
    parrafoHora.appendChild(spanHora)

    const parrafoTarea = document.createElement('p')
    parrafoTarea.classList.add('tareas__texto')
    const spanTarea = document.createElement('span')
    spanTarea.classList.add('tareas__span')
    spanTarea.textContent = tarea
    parrafoTarea.appendChild(spanTarea)

    divTareasDatos.appendChild(parrafoFecha)
    divTareasDatos.appendChild(parrafoHora)
    divTareasDatos.appendChild(parrafoTarea)


    const divAcciones = document.createElement('div')
    divAcciones.classList.add('tareas__acciones')
    const btnEditar = document.createElement('button')
    btnEditar.classList.add('tareas__button', 'tareas__button--editar')
    btnEditar.type = 'button'
    btnEditar.textContent = 'Editar'
    btnEditar.onclick = () => {
        let tareasArray = JSON.parse(localStorage.getItem(TAREAS)) || []
        llenarInputs(tareasArray.find( (tarea) => tarea.id === id ))
    }
    const btnEliminar = document.createElement('button')
    btnEliminar.classList.add('tareas__button', 'tareas__button--eliminar')
    btnEliminar.type = 'button'
    btnEliminar.textContent = 'Eliminar'
    divAcciones.appendChild(btnEditar)
    divAcciones.appendChild(btnEliminar)
    btnEliminar.onclick = () => {
        let tareasArray = JSON.parse(localStorage.getItem(TAREAS)) || []
        const arrayActualizado = tareasArray.filter((tarea) => tarea.id !== id)
        ListaTareas(arrayActualizado)
        sincronizarStorage(TAREAS, arrayActualizado)
        limpiarForm(document.querySelector('.formulario__contenido'))
        limpiarObjeto()
    }
    

    // Agregando a su contenedor principal
    li.appendChild(divTareasDatos)
    li.appendChild(divAcciones)
    return li
}

export default Tareas