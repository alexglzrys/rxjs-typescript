import { fromEvent, Observer } from 'rxjs';

// Crear un Observable a partir de un Event Target (Evento disparado en el DOM)
const obs1$ = fromEvent<PointerEvent>(document, 'click');     // click del mouse
const obs2$ = fromEvent<KeyboardEvent>(document, 'keyup');    // soltar una tecla 

// Crear el Observer para trabajar con la data emitida por el Observable
const observer: Observer<Event> = {
    next: (val) => console.log('next', val),
    error: (err) => console.warn('error', err),
    complete: () => console.log('proceso completado')
}

// Subscripción 
obs1$.subscribe(({x,y}) => console.log(x, y));
obs2$.subscribe(observer);