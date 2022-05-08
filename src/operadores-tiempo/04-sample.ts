import { interval, fromEvent } from 'rxjs';
import { sample } from 'rxjs/operators';

const interval$ = interval(500);
const click$ = fromEvent(document, 'click');

interval$.pipe(
    /**
     * El operador sample funciona con dos Observables
     * Va a dejar pasar el último valor emitido siempre y cuando el Observable que está observando emita un valor.
     * Si el flujo de información principal no emite valores por un tiempo y el Observable al cual se esta observando emite un valor o varios de forma consecutiva, no pasa nada, pues no hay valores emitidos en el flujo principal.
     * Si despues de ello se comienzan a emitir valores en el flujo, su comportamiento es el mismo, es decir, hasta que el Observable que se observa emita otro valor, dejará pasar el último valor emitodo en el flujo de información principal
     */
    sample(click$)
).subscribe(console.log);