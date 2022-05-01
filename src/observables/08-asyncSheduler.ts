import { asyncScheduler } from 'rxjs';

// asyncScheduler nos permite crear setInterval() y setTimeout() a partir un Observable
// son diferentes a interval y timer, puesto que estos emiten solo valores numéricos, a comparación de asyncSheduler la cual nos permite pasar una función con cierta lógica declarada para procesar

const saludar = () => console.log('Hola mundo');
const informe = (data) => console.log(`Bienvenido ${data.name} al mundo de ${data.work}`)

// Crear un setTimeout

// Programar una tarea de forma asincrona, en este caso se ejecutará después de 3 segundos (Similar a setTimeour)
asyncScheduler.schedule(saludar, 3000);
// El estado (parámetros de la tarea), se debe pasar como un solo argumento, o un objecto / array si se desea varios valores
asyncScheduler.schedule(informe, 5000, {name: 'Alejandro', work: 'RxJS'});


// Crear un setInterval

// ! En este punto la función a pasar debe ser normal y no un arrow function
// Se ejecuta después de 3 segundos, su estado inicial es 1000, y por cada ejecución su estado cambia en +1

const subs$ = asyncScheduler.schedule(function(state) {
    console.log(`Informe No. ${state.counter} preparado por ${state.name} referente a ${state.work}`)
    // Cambiar el estado inicial cada intervalo de tiempo
    
    //this.schedule(state.counter + 1, 1000);
    this.schedule({...state, counter: state.counter + 1}, 1000);

    if (state.counter > 1010) {
        // cancelar la suscripción si el estado es superior a 1010
        this.unsubscribe();
    }
}, 3000, {name: 'alex', work: 'Rxjs', counter: 1000});


