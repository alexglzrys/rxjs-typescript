import { from, range } from 'rxjs';
import { filter } from 'rxjs/operators';

range(1, 10).pipe(
    // El operador filter permite filtrar cierta parte de la información que viene en el flujo de entrada
    filter((val, i) => {
        console.log('index', i)
        return val % 2 === 1
    })
).subscribe(console.log);

interface Personaje {
    tipo: string;
    nombre: string
};

const personajes:Personaje[] = [
    {
        tipo : 'heroe',
        nombre: 'Goku'
    },
    {
        tipo: 'villano',
        nombre: 'Vegeta'
    },
    {
        tipo: 'heroe',
        nombre: 'Gohan'
    }
];

from(personajes).pipe(
    // Filtrar los personajes, solo me interesan los del tipo heroe
    filter(personaje => personaje.tipo === 'heroe')
).subscribe(console.log)