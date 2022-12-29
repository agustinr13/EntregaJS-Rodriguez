//FORMULARIO DE REGISTRO

// Simula un formulario de registro con el objetivo de capturar datos de los diversos input, los cuales utiliza para modificar el DOM con un mensaje de bienvenida. Luego, crea un objeto usuario con los valores de los input, lo guarda en un array, lo convierte a json y lo envía al localStorage
let nombre = document.querySelector("#name")
let correo = document.querySelector("#correo")
let password = document.querySelector("#password")
let registro = document.querySelector("#registro")
let welcome = document.querySelector("#welcome")
const credenciales = []

const bienvenida = registro.addEventListener("submit", (e)=>{
    e.preventDefault()
    welcome.innerHTML = `
    <div class="alert alert-info" role="alert">
        <h3>¡BIENVENIDO!</h3>
        <p>Gracias ${nombre.value} por registrarte. Recibirás un correo en ${correo.value} para verificar tu usuario</p>
    </div>
    `
    const usuario = {
        nombre: `${nombre.value}`,
        correo: `${correo.value}`
    }
    credenciales.push(usuario)
    const credJson = JSON.stringify(credenciales)
    localStorage.setItem("User", credJson)
})


//CARRITO DE COMPRAS
//Simula un catalogo, que lee un array y modifica el DOM para crear un listado de productos, los cuales podrá agregar a un carrito que recibira los productos mediante un botón, los imprimirá en una lista y devolverá el precio total de los productos elegidos


//Inserto mi catálogo de productos mediante un array de objetos
const catalogo = [
    {nombre: "Mouse", precio: 1000, id: 1},
    {nombre: "Teclado", precio: 1200, id: 2},
    {nombre: "Auriculares", precio: 1500, id: 3},
    {nombre: "Parlantes", precio: 800, id: 4},
    {nombre: "Monitor", precio: 4000, id: 5},
    {nombre: "Gabinete", precio: 2000, id: 6},
    {nombre: "Placa de video", precio: 10000, id: 7},
    {nombre: "RAM", precio: 2500, id: 8},
    {nombre: "Motherboard", precio: 8000, id: 9},
    {nombre: "Fuente", precio: 700, id: 10}
]
//Declaro las variables asociadas al HTML que van a recibir como parametro el contenido del catalogo y el carrito de compras y las pintaran en forma de tablas
const tbody1 = document.querySelector(".tbody1")
const tbody2 = document.querySelector(".tbody2")
const vaciar = document.querySelector(".vaciar")
const comprar = document.querySelector(".comprar")

//Declaro una constante que modificará al DOM por cada elemento de mi array catalogo. Con cada producto que lea del array creará un botón de Agregar al Carrito asociado al producto.
const tabla1 = (p)=> {
    return `<tr>
    <td class="elemento">${p.id} -</td>
    <td class="elemento">${p.nombre}</td>
    <td class="elemento">${p.precio}</td>
    <td><button class="btn btn-info buybutton" id="${p.id}">Agregar al carrito</button></td>
</tr>`
}
//Mediante la funcion cargarStock genero una tabla que contiene cada item de mi array de productos
const cargarStock = (array)=> {
    let stock = ""
    if (array.length > 0) {
        array.forEach(p => {
            stock += tabla1(p)
        })
        tbody1.innerHTML = stock
        //Declaro una variable que se asocia al botón generado y le asigno una funcion al evento "click"
        const addButton = document.querySelectorAll(".buybutton")
        addButton.forEach ( el =>{
            el.addEventListener("click",(e)=>{
                agregarAlCarrito(e.target.id)
            })
        })
    }
}
//La función agregarAlCarrito, asociada al click al botón, busca en el catálogo el producto clickeado segun su ID, lo copia y lo envía a un nuevo array llamado carrito
const agregarAlCarrito = (id) => {
    let newItem = catalogo.find(p => p.id === parseInt(id))
    carrito.push(newItem)
    cargarCarrito(carrito)
    calcularTotalCompra()
} 
//Inicializo el array carrito vacío para agregarle productos
let carrito = []
// tabla2 y cargarCarrito funcionan de forma idéntica a tabla1 y cargarStock. La función lee el contenido del array carrito a medida que se le agregan productos y los pinta en la tabla inferior
const tabla2 = (c)=> {
    return `<tr>
    <td class="elemento">${c.id} -</td>
    <td class="elemento">${c.nombre}</td>
    <td class="elemento">${c.precio}</td>
</tr>`
}
const cargarCarrito = (array)=> {
    let compra = ""
    if (array.length > 0){
        array.forEach(c => {
            compra += tabla2(c)
        })
        tbody2.innerHTML = compra
    }
}

//Creo una funcion que calcula el precio total del carrito y lo imprime en el HTML
let total = carrito.reduce((t, p)=>{
    return t + p.precio
}, 0)

const totalCompra = document.getElementById('totalCompra');

const calcularTotalCompra = () => {
    let total = 0;
    carrito.forEach((producto) => {
        total += producto.precio
    });
    totalCompra.innerHTML = total;
};

cargarStock(catalogo)


