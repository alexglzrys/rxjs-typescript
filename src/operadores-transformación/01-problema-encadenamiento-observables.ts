import { fromEvent } from "rxjs";
import { debounceTime, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// Referencias
const body = document.querySelector('body');
const input = document.createElement('input');
const orderList = document.createElement('ol');

body.append(input, orderList);

// Streams

const input$ = fromEvent<KeyboardEvent>(input, 'keyup');

input$.pipe(
    debounceTime(500),
    map(ev => {
        const texto = (ev.target as HTMLInputElement).value;
        // La librería ajax regresa como resultado un Observable
        return ajax.getJSON(`https://api.github.com/users/${texto}`)
    })
).subscribe(res => {
    // La respuesta es un Observable
    // necesito subscribirme a la respuesta para obtener el resultado final
    // HAY OPERADORES RXJS PARA EVITAR EL CALLBACK DE OBSERVABLES
    res.pipe(
        map(data => data['url'])
    ).subscribe(console.log)
});