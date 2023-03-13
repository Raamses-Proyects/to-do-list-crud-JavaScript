export const generarId = () => {
    const fecha = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2)
    return random + fecha
}

export const limpiarHTML = (clase) => {
    const ul = document.querySelector(clase)
    while(ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
}

export const sincronizarStorage = (nombre, array) => {
    localStorage.setItem(nombre, JSON.stringify(array))
}

export function limpiarForm(form) {
    form.reset()
}