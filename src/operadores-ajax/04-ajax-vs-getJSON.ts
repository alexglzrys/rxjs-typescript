import { catchError } from 'rxjs/operators';
import { Observer, of } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';

//const urlAPI = 'https://api.github.com/users?per_page=5';
const urlAPI = 'https://httpbinxx.org/delay/1';

const manejaError = (err: AjaxError) => {
    // Si se implementa la interfaz Observer en la subscripción
    // Siempre se ejecutará el next al finalizar o completar la Subscripción, y no la lógica impementada en la propiedad error, 
    // ya que el error se está tratando con el operador catchError, 
    // el cual internamente decora la data en el flujo de información de forma que no se rompa nuestra aplicación
    // pero el error existe y es manejado por esta función

    // En caso de no implementar esa interfaz
    console.warn('Error en la petición', err.message);
    return of({ ok: false, message: err.message, users: [] });
}

/**
 * Diferencia entre ajax() y ajax.getJSON()
 * 
 * - Ambas nos permiten hacer peticiones HTTP
 * - ajax emite como respuesta un objeto más completo con datos técnicos y respuesta de la petición
 * - getJSON emite la respuesta directa de la petición
 * - En ambas se puede controlar el error con el operador catchError
 * - getJSON permite el envio de cabeceras adicionales en la petición
 */

ajax(urlAPI).pipe(
    catchError(manejaError)
).subscribe({
    next: data => console.log('next ajax', data),
    error: err => console.warn('error en el subscribe', err),
    complete: () => console.log('complete')
})

ajax.getJSON(urlAPI).pipe(
    catchError(manejaError)
).subscribe({
    next: data => console.log('next getJSON', data),
    error: err => console.warn('error en el subscribe', err),
    complete: () => console.log('complete')
});