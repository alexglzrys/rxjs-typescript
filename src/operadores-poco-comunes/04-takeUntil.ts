import { fromEvent, interval } from "rxjs";
import { takeUntil } from 'rxjs/operators';


const button = document.createElement('button');
button.innerHTML = 'Detener Timer';

document.querySelector('body').append(button);

const counter$ = interval(1000);
const clickBtn$ = fromEvent<PointerEvent>(button, 'click');

/**
 * El operador takeUntil va a completar la suscripción del primer observable hasta que el segundo observable emita su primer valor.
 * En pocas palabras va a tomar cualquier valor hasta que un segundo observable emite su primer valor
 * 
 * En este ejemplo se emiten valores cada 1 segundo,
 * pero cuando se hace click en el boton, el timer finaliza (ya que se emite el evento de click)
 */

counter$.pipe(
    takeUntil(clickBtn$)
).subscribe({
    next: (val) => console.log('next', val),
    complete: () => console.log('complete')
})