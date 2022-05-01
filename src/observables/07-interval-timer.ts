import { interval, Observer, timer } from 'rxjs';

// Crear un Observable que emite valores cada segundo en un intervalo de tiempo (parte de 0 hasta N-1)
// Esta función emite valores de forma asíncrona
const interval$ = interval(1000);

// Crear un Observable que emite un valor (cero) después de un cierto periodo de tiempo, se completa y termina
// const timer$ = timer(3000); 

// Ejecuta después de 3 segundos (emite cero), y posteriormente, por cada segundo emite un nuevo valor consecutivo (1,2,3,... n-1)
// const timer$ = timer(3000, 1000);


const hoyEn10segundos = new Date;
hoyEn10segundos.setSeconds(hoyEn10segundos.getSeconds() + 5);

// Ejecuta, completa y termina cuando se cumpla la hora exacta
const timer$ = timer(hoyEn10segundos);

const observer: Observer<number> = {
    next: (val) => console.log(val),
    error: (err) => console.warn(err),
    complete: () => console.log('complete')
};

console.log('--- Inicio ---');
//interval$.subscribe(observer);
timer$.subscribe(observer);
console.log('--- Fin ---');