import { fromEvent } from "rxjs";
import { map, tap } from 'rxjs/operators'

const body = document.querySelector('body');

// Agregar un bloque al documento con párrafos de texto 
const texto = document.createElement('div');
texto.innerHTML = `
<p>Lorem ipsum dolor sit amet consectetur adipiscing elit potenti, curae scelerisque risus et tortor taciti eu, vitae cubilia massa mi est dictum habitant. Erat montes aenean tincidunt fringilla class lacinia penatibus luctus augue, dapibus suscipit senectus nisi metus placerat consequat ante, facilisi curabitur mus nulla cras imperdiet viverra cum. Ante volutpat purus malesuada pellentesque aliquam scelerisque tellus ultricies, pharetra platea semper facilisi eu facilisis a. Nec dis ultrices auctor augue integer habitant justo nisl taciti, tempus egestas varius lacus etiam viverra odio.</p>
<p>Nulla litora tempor sodales erat morbi aptent, molestie ut convallis blandit odio malesuada, felis taciti suscipit ullamcorper habitasse. Pretium dictum semper maecenas odio mollis porttitor vehicula aptent, taciti aenean tellus etiam morbi auctor accumsan lacinia, bibendum commodo erat egestas cubilia ultricies ut. Dictum facilisi ridiculus gravida ad enim mauris hendrerit sem posuere condimentum volutpat lobortis tristique sed fusce dapibus, senectus nunc velit habitasse suscipit vel euismod suspendisse turpis venenatis dis est feugiat justo.</p>
<p>Vulputate commodo natoque accumsan faucibus ornare duis sem gravida mi, viverra pellentesque vitae enim tincidunt sed fringilla ridiculus aptent, dictumst tellus quis auctor ligula habitasse turpis class. Donec curae litora in accumsan pharetra inceptos molestie class, nulla sagittis augue cras ultricies blandit. Est sodales varius lacus rhoncus ante facilisis nostra hendrerit senectus pharetra, cursus orci ultrices libero sociosqu molestie tempus feugiat nam, tristique facilisi purus ad ullamcorper semper platea habitant risus. Ac vivamus rutrum lectus pulvinar fringilla libero eros sollicitudin tortor etiam tempor, ultrices hac suspendisse non quisque potenti gravida praesent ullamcorper bibendum, cum nascetur tempus ornare iaculis quam suscipit penatibus dui felis.</p>
<p>Neque mattis risus suspendisse placerat ultricies ut aliquet egestas sem litora, sollicitudin quisque ante cum quam enim potenti est eros maecenas, molestie arcu rhoncus dictumst vitae velit vehicula sed felis. Natoque mauris ut etiam ultrices imperdiet tempor feugiat per, scelerisque dictum quisque pharetra pellentesque penatibus platea viverra, dui venenatis sagittis vulputate felis ac hac. Bibendum rutrum habitasse libero neque aliquet vestibulum blandit, quisque eros auctor sociosqu torquent penatibus laoreet, nunc cras proin pulvinar et ac.</p>
`;
body.append(texto);

// Agregar un bloque al documento que funga como indicador de barra de progreso
const progressBar = document.createElement('div');
progressBar.setAttribute('class', 'progress-bar');
body.append(progressBar);

// Crear un Observable a partir del evento scroll en el DOM
const scroll$ = fromEvent<Event>(document, 'scroll');
scroll$.pipe(
    // Pasar toda la información del evento scroll a la función, la cual retorna el porcentaje actula de scroll en el documento
    map(event => calcularPorcentajeScroll(event)),
    // Inspeccionar el porcentaje actual de scroll
    tap(console.log)
).subscribe(porcentaje => {
    progressBar.style.width = `${porcentaje}%`;
})


const calcularPorcentajeScroll = event => {
    console.log(event)
    const { scrollTop, scrollHeight, clientHeight } = event.target.documentElement;
    // scrollHeight = Alto de todo el documentp
    // clientHeight = Alto del viewport del navegador (zona visible)
    // scrollTop    = La distancia que hay de la parte superior del viewport y el scroll 
    return (scrollTop / (scrollHeight - clientHeight)) * 100;
}