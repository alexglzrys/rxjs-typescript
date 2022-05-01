import { Observable, Subject, Observer } from 'rxjs';

const interval$ = new Observable<number>(subscribe => {
    const intervalId = setInterval(() => {
        subscribe.next(Math.random())
    }, 1000);

    return () => {
        clearInterval(intervalId);
        console.log('Intervalo destruido');
    }
});

// Cada subscriptor recibe un número random diferente...
// const subs1 = interval$.subscribe(rnd => console.log('Subscribe 1', rnd));
// const subs2 = interval$.subscribe(rnd => console.log('Subscribe 2', rnd));


const observer: Observer<number> = {
    next: (rnd: number) => console.log('Subscribe', rnd),
    error: (err) => console.warn('Error', err),
    complete: () => console.log('completado') 
}


/**
 * Subject
 * 
 * 1. Permite el casteo múltiple:   Los subscritores recibirán la misma información
 * 2. Es un observer:               Se puede pasar como argumento a un subscriptor (incorpora las propiedades, next, error, complete)
 * 3. Es un Observable especial:    Permite múltiples subscribe, y los valores que emite son multidifusión (de aquí que los subscriptores reciban la misma información cada vez que se emite)
 *                                  Puede alimentar valores HOT desde fuera o completar su trabajo mediante next(), complete()
 * 
 * Nota: Cabe aclarar que un Observable normal emite valores unidifusión, 
 */

const subject$ = new Subject<number>();
const mySubscription = interval$.subscribe(subject$);

// Cada subscriptor recibe el mismo número random...
const subs1 = subject$.subscribe(observer);
const subs2 = subject$.subscribe(observer);

setTimeout(() => {
    // Los Subjet pueden producir data fuera del Observable original, lo que se le conoce como HOT Observable
    // Cuando la data es producida por el propio Observable, es considerado como un COLD Observable (no se puede alterar desde fuera)

    subject$.next(85);
    subject$.complete();

    // ! Cuando se completa un Subject, no significa que termina la subscripción, es necesario terminarla desde la fuente original
    // En pocas palabras, completar un Subject no ejecuta de forma automática la función de retorno declarada en el Observable original 
    mySubscription.unsubscribe();
}, 5000);