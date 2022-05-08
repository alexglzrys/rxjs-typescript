import { fromEvent } from 'rxjs';
import { debounceTime, map, tap, distinct, distinctUntilChanged } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

click$.pipe(
    /**
     * El operador debounceTime recibe el flujo de información, espera la cantidad de milisegundos especificada como parámetro, y posterior a ello deja pasa el flujo de información al siguiente operador
     * 
     *  Durante ese tiempo de espera, el operador sirve como embudo, y solo deja pasar el última información emitida. Esto ayuda a que el Observable no se sature de información en cola, si antes de los tres segundos se emitieron 7 eventos, y después nada, es el séptimo evento el que se recibe y se pasa al siguiente operador.
     */
    debounceTime(3000)
).subscribe(console.log);

const input = document.createElement('input');
document.querySelector('body').append(input);

const input$ = fromEvent<KeyboardEvent>(input, 'keyup');

input$.pipe(
    tap(() => console.log('antes - debounce')),
    /**
     * Este operador es especialmente útil para retardar el envio de la data a un server HTTP, para no saturarlo de peticiones
     */
    debounceTime(1000),
    map(event => (event.target as HTMLInputElement).value ),
    /**
     * Si sumamos este otro operador, ayudamos aun más para que no se envien peticiones HTTP si la anterior es igual a esta otra petición.
     * Ya que la data retornada por el server sería la misma
     */
    distinctUntilChanged(),
    tap(() => console.log('despues - debounce')),
).subscribe(console.log);