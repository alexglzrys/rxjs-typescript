import { from } from "rxjs";
import { distinctUntilKeyChanged } from 'rxjs/operators';

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

/**
 * El operador distinctUntilKeyChanged es similar al operador distinctUntilChanged en cuanto al filtrado de valores repetidos en propiedades de objetos
 * 
 * La diferencia radica en que no necesita una función de predicado para filtrar, solo se debe especificar el nombre de la propiedad que debe inspeccionar en busca de valores que se repiten de forma continua en el flujo de información  
 */

from(personajes).pipe(
    distinctUntilKeyChanged('nombre')
).subscribe(console.log);