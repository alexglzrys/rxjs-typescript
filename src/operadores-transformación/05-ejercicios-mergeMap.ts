import { fromEvent } from "rxjs";
import { debounceTime, map, mergeAll, mergeMap, pluck } from 'rxjs/operators';
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
    // MergeMap toma un flujo con valores de entrada, transforma esos valores y puede suscribirse automáticamente a otro Observable. Este dejará pasar la data al siguiente operador cuando el flujo principal y los secundarios se hayan completado.
    mergeMap(ev => {
        const texto = (ev.target as HTMLInputElement).value;
        /**
         * La librería ajax regresa como resultado un Observable.
         * Por tanto, por cada valor de entrada en el mergeMap, se hará una petición al endpoint especificado
         * MergeMap, se completará, hasta que dejen de existir valores tanto en el flujo principal como en los secundarios
         * Por flujo secundario se entiende que son cada uno de los Observables generados por la librería Ajax
         * 
         * Esto tiende a ser un problema, ya que map invoca al endpoint por cada valor en el flujo
         * lo que puede acarrear problemas al saturar el server.
         * Por eso es importante hacer uso de un debounceTime
         *  */ 
        return ajax.getJSON(`https://api.github.com/search/users?q=${texto}`)
    }),
    map(data => data['items'])
);


const url = 'https://httpbin.org/delay/1?arg=';

input$.pipe(
    pluck('target', 'value'),
    /**
     * Sin el uso de un debounceTime, se estaría golpeando el server
     * tantas veces como número de letras exista en el valor
     * 
     * Para estos casos existen otros operadores de aplanamiento.
     */
    mergeMap(texto => ajax.getJSON(url + texto))
).subscribe(console.log)