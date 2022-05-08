import { fromEvent, asyncScheduler } from 'rxjs';
import { throttleTime, map, tap, distinctUntilChanged } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

click$.pipe(
    /**
     * El operador throttleTime funciona al contrario que debounceTime
     * Recibe el primer valor emitido y lo deja pasar, posterior a ello, espera la cantidad de milisegundos establecidos en su parámetro, luego emite el siguiente valor, y así sucesivamente.
     * 
     * Los valores emitidos entre el periodo de tiempo de espera son descartados por el operador, y solo se emite el último que está en cola.
     * 
     */
    throttleTime(3000)
).subscribe(console.log);

const input = document.createElement('input');
document.querySelector('body').append(input);

const input$ = fromEvent<KeyboardEvent>(input, 'keyup');

input$.pipe(
    tap(() => console.log('antes - debounce')),
    /**
     * Una configuración adicional que se le puede hacer este operador es que le indiquemos que solo tome el primer y último valor emitido, al juguar con esta configuración, podemos hacer que se comporte igual que el debunceTime
     * Esto viene genial en buscadores que muestran coincidencias, ya que a diferencia de debounceTime, no se espera hasta que uno deje de escribir, sino que todo está basado en el tiempo, y lo que se tenga en ese momento es lo que se envia
     */
    throttleTime(1000, asyncScheduler, { leading: false, trailing: true }),
    map(event => (event.target as HTMLInputElement).value ),
    /**
     * Si sumamos este otro operador, ayudamos aun más para que no se envien peticiones HTTP si la anterior es igual a esta otra petición.
     * Ya que la data retornada por el server sería la misma
     */
    distinctUntilChanged(),
    tap(() => console.log('despues - debounce')),
).subscribe(console.log);