function Alerta(mensaje) {
    const divAlerta = document.createElement('div')
    divAlerta.classList.add('alerta')
    const parrafo = document.createElement('p')
    parrafo.classList.add('alerta__texto')
    parrafo.textContent = mensaje
    divAlerta.appendChild(parrafo)
    return divAlerta
}

export default Alerta