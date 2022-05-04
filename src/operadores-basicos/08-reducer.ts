import { interval } from 'rxjs';
import { take, tap, reduce } from 'rxjs/operators'; 

const totalReducer = (acumulador, valor_actual) => acumulador + valor_actual;

// Generar un Observable que emita valores cada segundo
const interval$ = interval(1000);
interval$.pipe(
    // Tomar los 6 primeros
    take(6),
    // Inspeccionar cada valor emitido (interval emite valores númericos, comenzando desde 0)
    tap(console.log),
    // El operador reducer funge como un acumulador (sumatoria de valores emitidos) y retorna como valor transformado, el total.
    // Es importante mencionar que no emite un resultado por cada valor que entra, solo emite el resultado cuando no hay más valores que procesar (se completa el Observable)
    reduce(totalReducer, 0)
).subscribe({
    next: val => console.log('next', val),
    complete: () => console.log('completado')
});
