/* {// Variables

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}




// Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
     }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                     return curso;
                } else {
                     return curso;
             }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     // console.log(articulosCarrito)

     

     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const cursoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma lenta
     // contenedorCarrito.innerHTML = '';


     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}


} 
*/

const car = document.querySelector('#carrito');
const containerCar = document.querySelector('#lista-carrito tbody');
const listCourses = document.querySelector('#lista-cursos')
const cleanCar = document.querySelector('#vaciar-carrito');
let carArticles = []


loadEventListner();
//? Functions:

function loadEventListner() {
     //! Event when the customer press button "Agregar al carrito"
     listCourses.addEventListener('click', addCourse);

     //! Event when the customer press button "Borrar del carrito"
     car.addEventListener('click', deleteCourse)
}

//* function for add to car
function addCourse(e) {
     e.preventDefault();
     if (e.target.classList.contains('agregar-carrito')) {
          const courseSelected = e.target.parentElement.parentElement;
          readData(courseSelected);
     } else {
          console.log('Clic missed');
     }
}

//* function to read the car
function readData(e) {
     const infoCurso = {
          id: e.querySelector('a').getAttribute('data-id'),
          image: e.querySelector('img').src,
          tittle: e.querySelector('h4').textContent,
          price: e.querySelector('.precio span').textContent,
          quantity: 1
     }

     const exist = carArticles.some(e => e.id === infoCurso.id); //! Check if the element already exist

     if (exist) {
          const courses = carArticles.map(e => {
               if (e.id === infoCurso.id) {
                    e.quantity++ //? Return the object updated
               } else {
                    return e //? Return the object no
               }
          })
     } else {
          carArticles = [...carArticles, infoCurso];
     }

     //? Add elements to array in the car
     console.log(carArticles);
     carHTML();
}

//* Show the car in the HTML
function carHTML() {

     cleanHTML(); //! Function to clean html in the car
     carArticles.forEach((car) => {

          const { image, tittle, price, quantity } = car
          const row = document.createElement('tr');
          row.innerHTML = `
               <td><img src="${image}" style="max-width: 80px;"></td>
               <td>${tittle}</td>
               <td>${price}</td>
               <td>${quantity}</td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${car.id}"> x </a>
               </td>
          `
          containerCar.appendChild(row);
     });
};

//* function to cleanHTML
function cleanHTML() {
     //containerCar.innerHTML = "";//! this way take more time to clean
     while (containerCar.firstChild) {
          containerCar.removeChild(containerCar.firstChild);
     }
}


//* function to delete from car
function deleteCourse(e) {
     console.log(e.target.classList);
     if (e.target.classList.contains('borrar-curso')) {
          const courseId = e.target.getAttribute('data-id');

          //? Delete of the car
          carArticles = carArticles.filter((course) => course.id !== courseId);
          console.log(carArticles);

          carHTML();
     }
}

