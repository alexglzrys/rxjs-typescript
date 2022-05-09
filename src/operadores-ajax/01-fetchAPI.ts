/**
 * Ejemplo con la FetchAPI de JavaScript
 * la cual trabaja con Promesas.
 * 
 * Su variante en RxJS en la librería ajax, la cuál trabaja con Observables
 */

const url = 'https://api.github.com/userXXXs?per_page=5';

const fetchData = fetch(url);

// fetchData.then(response => response.json() )
//         .then(console.log)
//         .catch(console.log)

let manejaError = (res: Response) => {
    // Github envía una respuesta a pesar de que la petición es incorrecta
    // Sin embargo, en la data aparece una propiedad ok con valor de false, si hubo un error
    if (!res.ok) throw new Error('Error en la petición')
    return res;
}

fetchData
    .then(manejaError)
    .then(response => response.json() )
    .then(console.log)
    .catch((err: Error) => console.warn('error', err.message))