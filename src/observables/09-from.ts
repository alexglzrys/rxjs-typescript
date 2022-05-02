import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators'

const fetchData = fetch('https://api.github.com/users/klerith');


// from permite convertir casi cualquier cosa en un Observable (array, valor primitivo, objeto, Promesa, etc)
const obs$ = from(fetchData).pipe(
    // El operador switchMap permite encadenar peticiones HTTP
    switchMap(response => response.json()),
);

obs$.subscribe(res => console.log(res));