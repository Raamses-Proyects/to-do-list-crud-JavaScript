import Alerta from '../components/Alerta.js'
import Tareas from '../components/Tareas.js'
import { generarId, sincronizarStorage, limpiarForm, limpiarHTML } from '../helpers/helpers.js'
import { TAREAS } from '../constantes/consts.js'



// Variables
const formulario = document.querySelector('.formulario__contenido')
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora')
const tareaInput = document.querySelector('#tarea')
const datos = { fecha: '', hora: '', tarea: '' }
let tareasArray = JSON.parse(localStorage.getItem(TAREAS)) || []



// Eventos
window.onload = () => {
    fechaInput.addEventListener('change', obtenerDatos)
    horaInput.addEventListener('change', obtenerDatos)
    tareaInput.addEventListener('change', obtenerDatos)
    formulario.addEventListener('submit', agregarTarea)
    ListaTareas(tareasArray)
}



// Funciones
function obtenerDatos(e) {
    datos[e.target.name] = e.target.value
}

function agregarTarea(e) {
    e.preventDefault()

    // Validación
    let arrayValidacion = Object.values(datos)
    for(let i = 0; i < arrayValidacion.length; i++) {
        if( arrayValidacion[i].trim('') === '' ) {
            const alerta = Alerta('No se permiten espacios en blanco')
            formulario.insertBefore(alerta, document.querySelector('.formulario__submit'))
            setTimeout(() => {
                alerta.remove()
            }, 3000)
            return
        }
    }

    // Actualizando
    if(datos.id) {
        const arrayActualizado = tareasArray.map((tarea) => {
            if( tarea.id === datos.id ) {
                return datos
            }
            else {
                return tarea
            }
        })
        ListaTareas(arrayActualizado)
        sincronizarStorage(TAREAS, arrayActualizado)
    }
    else { // Insertando
        datos.id = generarId()
        tareasArray = [ ...tareasArray, {...datos} ]
        ListaTareas(tareasArray)
        sincronizarStorage(TAREAS, tareasArray)
    }

    // Reseteando form
    limpiarForm(formulario)
    limpiarObjeto()
}

export function ListaTareas(array) {
    limpiarHTML('.tareas__lista')
    const ul = document.querySelector('.tareas__lista')
    array.forEach((tarea) => {
        ul.appendChild(Tareas(tarea))
    })
}



// Helpers
export function llenarInputs(tareaSeleccionadaObj) {
    // Llenando inputs
    fechaInput.value = tareaSeleccionadaObj.fecha
    horaInput.value = tareaSeleccionadaObj.hora
    tareaInput.value = tareaSeleccionadaObj.tarea

    // Llenando objeto de datos, que esta vinculado con lo que ingresa el usuario
    datos.id = tareaSeleccionadaObj.id
    datos.fecha = tareaSeleccionadaObj.fecha
    datos.hora = tareaSeleccionadaObj.hora
    datos.tarea = tareaSeleccionadaObj.tarea
}

export function limpiarObjeto() {
    datos.id = ''
    datos.fecha = ''
    datos.hora = ''
    datos.tarea = ''
}