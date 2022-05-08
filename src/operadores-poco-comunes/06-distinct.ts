import { from, of } from 'rxjs';
import { distinct } from 'rxjs/operators'

const numeros$ = of(1,2,3,2,4,5,2,1,7,8,3,4,5,9,10,8,9,15,2);

numeros$.pipe(
    /**
     * El operador distinct permite filtrar información repetida que viaja en el flujo de información principal. Dejando pasar solo aquellos valores que son únicos.
     * El operador de comparación que usa internamente es estricto, por lo que compara por valor y tipo ===
     */
    distinct()
).subscribe(console.log)

interface Personaje {
    nombre: string;
}

const personajes: Personaje[] = [
    { nombre: 'Vegueta' },
    { nombre: 'Trunks' },
    { nombre: 'Goku' },
    { nombre: 'Gohan' },
    { nombre: 'Vegueta' },
    { nombre: 'Radix' },
    { nombre: 'Goku' },
    { nombre: 'Napa' },
    { nombre: 'Vegueta' }
]

from(personajes).pipe(
    /**
     * Si se le pasa una función de predicado al operador distinct
     * puede filtrar información repetida en estructura de datos complejas como es el caso de objetos
     * 
     * Para este ejemplo compara que la propiedad nombre no se repita
     */
    distinct(personaje => personaje.nombre)
).subscribe(console.log)
