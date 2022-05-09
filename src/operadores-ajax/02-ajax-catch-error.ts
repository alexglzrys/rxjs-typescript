import { map, catchError } from 'rxjs/operators';
import { ajax, AjaxError } from 'rxjs/ajax';
import { EMPTY, of } from 'rxjs';

const url_api = 'https://api.github.com/userxxxs?per_page=5';

/**
 * La librería ajax de RxJS permite hacer peticiones HTTP 
 * y devolver como resultado un Observable
 * 
 */

ajax(url_api).pipe(
    // Solo me interesa el valor que se encuentra en el response (la respuesta en si)
    map(data => data.response),
    /**
     * El operador catchError permite atrapar cualquier error que se emita en el flujo de información
     * Tareas a realizar dentro de este operador es hacer una nueva petición HTTP
     * Otra tarea consiste en devolver un Observable con la respuesta maquillada para que nuestra aplicación no se rompa al suceder un error
     */
    catchError((err: AjaxError) => {
        console.warn('Error en la petición', err.message);
        // Devolver un observable con un arreglo vacío
        return of([]);
    })
).subscribe(users => console.log('Listado de usuarios', users));
