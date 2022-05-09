import { catchError } from 'rxjs/operators';
import { Observer, of } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';

const urlAPI = 'https://httpbin.org/delay/1';

const manejaError = (err: AjaxError) => {
    console.warn('Error en la petición', err.message);
    return of({ ok: false, message: err.message, users: [] });
}

/**
 * La libería ajax implementa métodos para los verbos HTTP
 * GET, POST, PUT, DELETE
 * 
 * Además se puede recibir un objeto con toda la definición de la petición
 * al clásico estilo $.ajax() de jQuery
 */

// GET
ajax.get(urlAPI, { 'Content-type': 'application/json'}).pipe(
    catchError(manejaError)
).subscribe({
    next: data => console.log('next ajax GET', data),
    error: err => console.warn('error en el subscribe', err),
    complete: () => console.log('complete')
})

// POST
ajax.post(urlAPI, { email: 'alejandro@correo.com', password: '123456'}).pipe(
    catchError(manejaError)
).subscribe({
    next: data => console.log('next ajax POST', data),
    error: err => console.warn('error en el subscribe', err),
    complete: () => console.log('complete')
});

// PUT
ajax.put(urlAPI, {id: '1520', email: 'alejandro@correo.com', password: '123456'}).pipe(
    catchError(manejaError)
).subscribe({
    next: data => console.log('next ajax PUT', data),
    error: err => console.warn('error en el subscribe', err),
    complete: () => console.log('complete')
});

// DELETE
ajax.delete(urlAPI).pipe(
    catchError(manejaError)
).subscribe({
    next: data => console.log('next ajax DELETE', data),
    error: err => console.warn('error en el subscribe', err),
    complete: () => console.log('complete')
});

// CONFIGURACIÓN PERSONALIZADA
ajax({
    url: urlAPI,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Token': '4s5d4s1d1s8a1dere38431ew15w'
    },
    body: {
        name: 'Alejandro González',
        email: 'alejandro@corre.com',
        password: '123456'
    }
}).subscribe({
    next: data => console.log('next ajax CUSTOM', data),
    error: err => console.warn('error en el subscribe', err),
    complete: () => console.log('complete')
})