import { fromEvent } from 'rxjs';
import { map, sampleTime } from 'rxjs/operators';

const click$ = fromEvent<PointerEvent>(document, 'click');

click$.pipe(
    /**
     * El operador sampleTime espera la cantidad de milisegundos establecidos como parámetro, y despues de ello, deja pasar el flujo de información con el último evento emitido.
     * Cualquier evento sucitado entre ese periodo de tiempo, es descartado automáticamente, y solo se considera el último.
     */
    sampleTime(2000),
    map(({x, y}) => ({x, y}))
).subscribe(console.log);