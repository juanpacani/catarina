# Dialog (`cat-dialog`)

El componente `Dialog` muestra un cuadro de diálogo modal que se puede arrastrar.

### Importación

```typescript
import { Dialog } from 'catarina';
```

### Uso básico

```typescript
import { Component } from '@angular/core';
import { Dialog } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Dialog],
  template: `
    <cat-dialog *ngIf="showDialog" (closs)="showDialog = false">
      <h2>Título del Diálogo</h2>
      <p>Contenido del diálogo</p>
    </cat-dialog>
  `
})
export class ExampleComponent {
  showDialog = true;
}
```

### Propiedades (Inputs)

| Propiedad | Tipo | Valor por defecto | Descripción |
|-----------|------|-------------------|-------------|
| `variant` | `'surface' \| 'outlined' \| 'elevated'` | `'surface'` | Estilo visual del diálogo |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del diálogo |
| `customClass` | `string` | `''` | Clase CSS personalizada |

### Eventos (Outputs)

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `closs` | `EventEmitter<boolean>` | Se emite cuando se cierra el diálogo (siempre emite `false`) |

### Características

- **Arrastrable**: El diálogo incluye la directiva `CDrag` para poder arrastrarlo
- **Cierre con Escape**: Se cierra automáticamente al presionar la tecla `Escape`
- **Fondo oscuro**: Muestra un fondo oscuro semitransparente (`dialog-shadow`) que también cierra el diálogo al hacer clic
- **Posicionamiento fijo**: Se posiciona de forma fija en la pantalla

### Ejemplos

#### Diálogo básico

```typescript
<cat-dialog *ngIf="showDialog" (closs)="showDialog = false">
  <h2>Mi Diálogo</h2>
  <p>Contenido aquí</p>
</cat-dialog>
```

#### Diálogo con variante

```typescript
<cat-dialog 
  *ngIf="showDialog" 
  variant="elevated" 
  size="lg"
  (closs)="showDialog = false">
  <h2>Diálogo Elevado</h2>
  <p>Con sombra y tamaño grande</p>
</cat-dialog>
```

#### Diálogo con clase personalizada

```typescript
<cat-dialog 
  *ngIf="showDialog" 
  customClass="my-dialog"
  (closs)="showDialog = false">
  <h2>Diálogo Personalizado</h2>
  <p>Con estilos personalizados</p>
</cat-dialog>
```

### Notas

- El diálogo debe controlarse con `*ngIf` o similar para mostrarlo/ocultarlo
- El fondo oscuro (`dialog-shadow`) cubre toda la pantalla y tiene `z-index: 999`
- El diálogo tiene `z-index: 1000` para estar sobre el fondo
- El diálogo es arrastrable por defecto gracias a la directiva `CDrag`
