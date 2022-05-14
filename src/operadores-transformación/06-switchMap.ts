import { fromEvent } from "rxjs";
import { pluck, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// Referencias
const body = document.querySelector('body');
const input = document.createElement('input');
const orderList = document.createElement('ol');

body.append(input, orderList);

// Streams

const input$ = fromEvent<KeyboardEvent>(input, 'keyup');

const url = 'https://httpbin.org/delay/1?arg=';

input$.pipe(
    pluck('target', 'value'),
    /**
     * El operador SwitchMap
     * Es otro tipo de operador de aplanamiento muy interesante para tareas del tipo Ajax
     * Por cada valor que recibe, lo mapea y retorna un nuevo Observable al cuál automáticamente se suscribe
     * y no deja pasar la data la siguiente operador hasta que no existan más datos en el flujo principal y
     * en el flujo secundario más interno.
     * 
     * La diferencia con mergeMap, es que switchMap cancela la suscripción anterior si recibe un nuevo valor.
     * Por tanto se completará hasta que el último Observable se complete
     * 
     * Por eso es muy utilizado en peticiones Ajax, ya que no golpeamos frecuentemente el server, y no necesitamos
     * de operadores del tipo debounceTime (pero es aconsejable)
     * 
     */
    switchMap(texto => ajax.getJSON(url + texto))
).subscribe(console.log)