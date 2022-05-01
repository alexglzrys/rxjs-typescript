import { Observable, Observer } from 'rxjs';

const interval$ = new Observable<number>(suscriber => {
    let counter = 0;
    const interval = setInterval(() => {
        // Emitir un valor numrico cada 1 segundos
        suscriber.next(++counter)
        console.log('Información del interval', counter);
    }, 1000);

    // Completar nuestro Observable en 5 segundos
    setTimeout(() => {
        // A partir de este momento ya no se emitirán más valores a nustros suscriptores
        // Automáticamente se ejecuta la función complete declarada en el Observer
        suscriber.complete();
    }, 5000);

    // Función que se ejecuta cuando el subscriber cancela la subscripción, o el Observable se completa
    return () => {
        // De no destruir el setInterval, se tendría una fuga de memoria grave que en la mayoría de los casos es imperceptible sin un console.log
        clearInterval(interval);
        console.log('Intervalo destruido');
    }
});

const observer: Observer<number> = {
    next: function (value: number): void {
        console.log('Núm.', value);
    },
    error: function (err: any): void {
        console.warn('Error', err);
    },
    complete: function (): void {
        console.log('Proceso completado');
    }
}

// Generar 3 suscriptores al Observable de tipo intervalo de tiempo
const subs1 = interval$.subscribe(observer);
const subs2 = interval$.subscribe(observer);
const subs3 = interval$.subscribe(observer);

// Terminar suscripciones en cadena
// Esto permite que al cancelar la suscripción padre, se cancele también la suscripción del hijo
// Por tanto solo se necesita cancelar una suscripción (padre)
subs1.add(subs2)
subs2.add(subs3)

// Se desea cancelar toda suscripción en 8 segundos
setTimeout(() => {
    // Es altamente recomendable cancelar todo tipo de suscripción antes de cerrar, abandonar la página o destruir un componente (Angular).
    subs1.unsubscribe();
    /*subs2.unsubscribe();
    subs3.unsubscribe();*/

    console.log('Suscripciones canceladas')
}, 8000)