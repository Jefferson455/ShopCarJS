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
     car.addEventListener('click', deleteCourse);

     //! Show the courses loaded in LocalStorage
     document.addEventListener("DOMContentLoaded", () => {
          carArticles = JSON.parse(localStorage.getItem("Car")) || []
          carHTML();
     })

     cleanCar.addEventListener("click", () => {
          carArticles = []
          cleanHTML();
     })
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

     //? Add data to localStorage
     syncStorage();
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
     };
};

//* function to add the data in localStorage
function syncStorage() {
     localStorage.setItem("Car", JSON.stringify(carArticles))
}