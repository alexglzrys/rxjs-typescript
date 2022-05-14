import { fromEvent } from "rxjs";
import { debounceTime, map, mergeAll } from 'rxjs/operators';
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
        return ajax.getJSON(`https://api.github.com/search/users?q=${texto}`)
    }),
    /**
     * El operador mergeAll
     * Es un operador de aplanamiento, automáticamente se suscribe a cualquier Observable que venga adjunto
     * en el flujo de información (El resultado de la librería Ajax), y termina su función emitiendo la data aplanada 
     * hasta que todos los Observables se hayan completado
     * 
     * Por aplanado se entiende que la data resultante se va colocando en orden según se vaya resolviendo
     */
    mergeAll(),
    map(data => data['items'])
).subscribe(console.log);