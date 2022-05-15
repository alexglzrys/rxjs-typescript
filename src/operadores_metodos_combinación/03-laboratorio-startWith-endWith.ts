import { ajax } from 'rxjs/ajax';
import { startWith } from 'rxjs/operators';

const loadingDiv = document.createElement('div');
loadingDiv.classList.add('loading');
loadingDiv.innerHTML = 'Cargando...';

const body = document.querySelector('body');

ajax.getJSON('https://reqres.in/api/users/2?delay=3').pipe(
    startWith(true)
).subscribe(response => {
    // Si la respuesta es true - mostrar el loading
    if (response === true) body.append(loadingDiv)
    // Caso contrario - significa que ya terminó de obtener la data
    else document.querySelector('.loading').remove()
    console.log(response)
});