import { fromEvent } from 'rxjs';
import { map, tap, auditTime } from 'rxjs/operators';

/**
 * Los operadores RxJS para funciones de tiempo
 * 
 * Permiten filtrar las respuestas constantes que emite un Observable, con la finalidad de obtener respuestas concretas en un cierto lapso de tiempo
 * Prácticamente muchas de esas respuestas son información basura, que mejor filtrarla para no saturar la demanda de nuestras aplicación (memoria o recursos)
 * 
 * Visto desde un contexto de envío de solicitudes a un API, estos operadores vienen genirales para no saturar con una demanda de peticiones exagerada al server.
 */

const click$ = fromEvent<PointerEvent>(document, 'click');

click$.pipe(
    map(({x,y}) => ({x,y})),
    tap(val => console.log('tap:', val)),
    /**
     * El operador auditTime, escucha un flujo de información, espera la cantidad de milisegundos establecidos, y deja pasar la data con la última información enviada.
     * En pocas palabras, tambien actua como filtro.
     */
    auditTime(2000)
).subscribe(console.log);