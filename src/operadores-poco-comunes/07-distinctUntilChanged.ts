import { from, of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators'

const numeros$ = of(1,1,2,2,3,5,2,1,4,4,3,4,5,9,10,10,9,15,2);

numeros$.pipe(
    /**
     * El operador distinctUntilChanged es similar a distinct, con la unica diferencia que la comparación la hace entre valores emitidos simultaneos
     * Es decir compara el valor anterior con el actual y así sucesivamente, 
     * lo que da a lugar a que existan valores repetidos al completar la suscripción, pero separados entre sí
     */
    distinctUntilChanged()
).subscribe(console.log)

interface Personaje {
    nombre: string;
}

const personajes: Personaje[] = [
    { nombre: 'Vegueta' },
    { nombre: 'Vegueta' },
    { nombre: 'Trunks' },
    { nombre: 'Goku' },
    { nombre: 'Goku' },
    { nombre: 'Vegueta' },
    { nombre: 'Radix' },
    { nombre: 'Gothen' },
    { nombre: 'Vegueta' },
    { nombre: 'Vegueta' }
]

from(personajes).pipe(
    /**
     * Si se le pasa una función de predicado al operador distinctUntilChanged
     * puede filtrar información repetida en estructura de datos complejas como es el caso de objetos
     * 
     * Igual que distinct
     * 
     * Con la unica diferencia que la comparación se debe hacer entre el valor anterior y el valor actual
     */
     distinctUntilChanged((ant, act) => ant.nombre === act.nombre)
).subscribe(console.log)
