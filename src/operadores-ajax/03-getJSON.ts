import { ajax } from "rxjs/ajax";

// const urlAPI = 'https://api.github.com/users?per_page=5';
const urlAPI = 'https://httpbin.org/delay/1';


/**
 * getJSON es la forma acortada de realizar peticiones HTTP mediante la librería
 * de ajax de RxJS.
 * 
 * La cual nos emite como respuesta directa el resultado de la petición
 * 
 * Además nos permite enviar cabeceras adicionales en el cuerpo de nuestra petición
 */

ajax.getJSON(urlAPI, {
    'Content-Type': 'application/json',
    'Token': 'abc123ABC456'
}).subscribe(data => console.log('data: ', data));