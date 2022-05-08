import { fromEvent, interval } from "rxjs";
import { takeUntil, skip, tap } from 'rxjs/operators';


const button = document.createElement('button');
button.innerHTML = 'Detener Timer';

document.querySelector('body').append(button);

const counter$ = interval(1000);
const clickBtn$ = fromEvent<PointerEvent>(button, 'click').pipe(
    tap(() => console.log('tap - antes de skip')),
    // Va a omitir el primer evento
    skip(1),
    tap(() => console.log('tap - despues de skip'))
);


/**
 * El operador skip va a saltar u omitir la cantidad de valores establecidas en su parámetro, posterior a ello, deja pasar cualquier valor en el flujo de información
 * 
 * En este ejemplo se emiten valores cada 1 segundo,
 * pero cuando se hace dos clicks en el boton, el timer finaliza (ya que se emite el evento de click)
 */

counter$.pipe(
    takeUntil(clickBtn$)
).subscribe({
    next: (val) => console.log('next', val),
    complete: () => console.log('complete')
})