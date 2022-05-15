import { map } from 'rxjs/operators';
import { from } from 'rxjs';
/**
 * Ejercicio: 
 * El objetivo de es realizar la misma impresión, pero usando observables
 * Nota: NO hay que usar el ciclo "FOR OF", usar un observable y llamar la función capitalizar
 */

/**
 * Salida esperada:
 * Batman
 * Joker
 * Doble Cara
 * Pingüino
 * Hiedra Venenosa
 */
 (() =>{


    const nombres = ['batman', 'joker', 'doble cara', 'pingüino', 'hiedra venenosa'];
  
    const capitalizar = (nombre: string) => nombre.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  
  
    // Cambiar este FOR OF, por un observable y capitalizar las emisiones
    /* for( let nombre of nombres ) {
      console.log( capitalizar(nombre) )
    } */
  
  
    // Convertir el arreglo de nombres en un Observable
    const nombres$ = from(nombres);

    nombres$.pipe(
        // Mapear cada elemento que se emite a su versión capitalizada
        map(capitalizar)
    ).subscribe(console.log)
  
  
  })();
  