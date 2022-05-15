import { combineLatest, fromEvent, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

/**
 * Método combineLatest
 * Toma como argumento un conjunto de Observables
 * 
 * Emite como resultado un arreglo con los últimos valores emitidos en cada uno de los Observables.
 * Por tanto, siempre emitirá el primer valor hasta que todos los Observables hayan emitido por lo menos algun valor
 * 
 * El método terminará, hasta que todos los Observables se hayan completado.
 */

const email = document.createElement('input');
const pass = document.createElement('input');

email.placeholder = 'usuario@correo.com';
email.type = 'email'
pass.placeholder = '******';
pass.type = 'password';

document.querySelector('body').append(email, pass);

// Helper
const getInputStream = (element: HTMLInputElement) => fromEvent<KeyboardEvent>(element, 'keyup').pipe(
    pluck('target', 'value')
);

combineLatest(
    getInputStream(email), 
    getInputStream(pass)
).subscribe(console.log)