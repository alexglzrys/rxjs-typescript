import { forkJoin, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';

const GITHUB_API_URL = 'https://api.github.com/users';
const GITHUB_USER = 'alexglzrys';

/**
 * El caso de uso más común para el método forkJoin
 * es agrupar peticiones Ajax.
 * Cuando se completen todas, este emitirá un resultado.
 * 
 * Si alguna petición falla, la operación falla por completo.
 * ES POR ESO QUE SE DEBE CONTROLAR EL ERROR POR CADA PETICIÓN.
 * 
 * Se puede controlar al final, sumando un pipe antes de la suscripción con el operador catchError
 * pero a pesar que funciona, no sabremos a ciencia cierta cual petición falló.
 */

forkJoin({
    usuario: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`),
    repos: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/repos`),
    gists: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gists`).pipe(
        // Es importante controlar el error, ya que si alguna petición falla. forkJoin fallará por completo, aunque algunos Observables se hayan completado correctamente
        catchError(err => of([]))
    )
}).subscribe(console.log);