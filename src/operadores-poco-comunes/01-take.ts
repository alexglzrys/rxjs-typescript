import { of } from 'rxjs';
import { take, tap } from "rxjs/operators";

const numeros$ = of(1,2,3,4,5)

numeros$.pipe(
    tap(val => console.log('tap:', val)),
    /**
     * El operador take toma un cierto conjunto de valores del flujo de información principal, y se encarga de terminar o finalizar la suscripción cuando obtiene el conjunto de valores necesarios.
     * No importa que existan más valores en el flujo principal o se genere un error posterior.
     */
    take(3)
).subscribe({
    next: (val) => console.log('next:', val),
    complete: () => console.log('complete')
})