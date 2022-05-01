// Todo lo que se importe directamente de 'rxjs', significa que es algo para crear Observables

import { Observable, Observer } from 'rxjs'

// Crear un Observable que emite cadenas de texto
const obs$ = new Observable<string>(suscriber => {
    // Emitir un valor a mis subscritores
    suscriber.next('Hola');
    suscriber.next('Mundo');
    suscriber.next('RxJS');

    // Forzar un error
    // const a = undefined;
    // a.name = 'Alejandro';

    // Completar la tarea del Observable
    suscriber.complete();

    // Cualquier valor emitido después de un complete, ya no es escuchado por los sucriptiores
    suscriber.next('Hola de nuevo');
    suscriber.next('desde el curso de extensiones reactivas');
});

// Suscribirse a un Observable (para ejecutar un Observable por lo menos debe haber una suscripción)

// Posibles argumentos enviados a un Subscriber:

// 1. Imprimir directamente la respuesta
// obs$.subscribe(console.log);

// 2. Generar lógica personalizada según el tipo de respuesta
// El objeto con esta lógica se le conoce como un Observer
/*const observer: Observer<string> = {
    next: value => console.log('next', value),
    error: err => console.warn('error', err),
    complete: () => console.info('completado')
}

obs$.subscribe(observer);*/

// 3. Por lo general, el objeto observer se le coloca de forma implicita en el argumento del suscritor
obs$.subscribe({
    next: value => console.log('next', value),
    error: err => console.warn('error', err),
    complete: () => console.info('completado')  
});
