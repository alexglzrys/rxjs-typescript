import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, mergeAll } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { GithubResponse } from '../interfaces/GithubResponse';
import { GithubUser } from '../interfaces/GithubUser';

// Referencias
const body = document.querySelector('body');
const input = document.createElement('input');
const orderList = document.createElement('ol');

body.append(input, orderList);


// Renderizar datos
const mostrarUsuarios = (users: GithubUser[]) => {
    orderList.innerHTML = ''
    users.forEach(user => {
        const li = document.createElement('li')
        const img = document.createElement('img')
        const a = document.createElement('a')
        const h3 = document.createElement('h3')
        const div = document.createElement('div')

        h3.innerHTML = user.login
        a.innerHTML = 'Visitar Github'
        a.href = user.html_url
        img.src = user.avatar_url

        div.append(h3, a)
        li.append(img, div)
        orderList.append(li)
    });
}


// Streams
const input$ = fromEvent<KeyboardEvent>(input, 'keyup');

input$.pipe(
    /**
     * Se recomienda encarecidamente especificar el tipado de entrada y salida de datos
     * en los operadores RxJS
     * 
     * En la práctica, solo es necesario especificar el tipado al inicio y al final
     * sobre todo si esta lógica se encuentra almacenada en un servicio.
     * Para saber que se necesita y que devuelve como resultado.
     */
    debounceTime<KeyboardEvent>(500),
    map<KeyboardEvent, Observable<GithubResponse>>(ev => {
        const texto = (ev.target as HTMLInputElement).value;
        // La librería ajax regresa como resultado un Observable
        return ajax.getJSON(`https://api.github.com/search/users?q=${texto}`)
    }),
    mergeAll<Observable<GithubResponse>>(),
    map<GithubResponse, GithubUser[]>(data => data.items)
).subscribe(mostrarUsuarios);

