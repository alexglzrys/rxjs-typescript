import { fromEvent, of } from 'rxjs';
import { tap, map, mergeMap, pluck, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// Generar elementos en el DOM
const form = document.createElement('form');
const inputEmail = document.createElement('input');
const inputPassword = document.createElement('input');
const button = document.createElement('button');

// Configuración de elementos
inputEmail.type = 'email';
inputEmail.placeholder = 'Ingrese su email';
inputEmail.value = 'eve.holt@reqres.in';

inputPassword.type = 'password';
inputPassword.placeholder = 'Ingrese su password';
inputPassword.value = 'cityslicka';

button.type = 'submit';
button.textContent = 'Enviar'

form.append(inputEmail, inputPassword, button);
document.querySelector('body').append(form);

// Helper Petición Ajax
const peticionHttpLogin = data => ajax.post('https://reqres.in/api/login?delay=1', data).pipe(
    // Solo me interesa recuperar el token
    pluck('response', 'token'),
    // Para peticiones HTTP, siempre es importante controlar el error.
    // En este caso mando un valor nulo
    catchError(err => of(''))
)

// Streams
const submitForm$ = fromEvent<SubmitEvent>(form, 'submit')

submitForm$.pipe(
    // Prevenir el comportamiento por defecto del navegador
    tap(ev => ev.preventDefault()),
    // Solo me interesa un objeto con el email y password
    map(ev => ({email: ev.target[0].value, password: ev.target[1].value})),

    // Todas las peticiones se envían al server
    // mergeMap(peticionHttpLogin),
    
    // Solo se envía la última petición (si hay una en procesamiento actualmente, se cancela)
    // switchMap(peticionHttpLogin)

    // Similar a switchMap, pero en este caso no se cancelan las suscripciones anteriores,
    // simplemente si hay una en ejecución, las peticiones entrantes se cancelan.
    
    // Enviar la data al server para simular el login (esto genera un nuevo Observable, por tanto uso una función de aplaneamiento para suscribirme al resultado automaticamente desde este tipo de operador)
    exhaustMap(peticionHttpLogin)
).subscribe(token => console.log(token))