# Drag (`CDrag`)

La directiva `CDrag` permite hacer elementos arrastrables con el mouse.

### Importación

```typescript
import { Drag } from 'catarina';
```

### Uso básico

```typescript
import { Component } from '@angular/core';
import { Drag } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Drag],
  template: `
    <div CDrag style="width: 200px; height: 100px; background: var(--primary-color-2);">
      Arrástrame
    </div>
  `
})
export class ExampleComponent {}
```

### Características

- **Posicionamiento automático**: Si el elemento no tiene `position` definido, la directiva establece `position: absolute` automáticamente
- **Cursor visual**: Cambia el cursor a `grabbing` mientras se arrastra y a `grab` cuando está listo
- **Eventos de mouse**: Maneja `mousedown`, `mousemove` y `mouseup` para una experiencia fluida
- **Cálculo de offset**: Calcula correctamente el offset del mouse respecto al elemento

### Funcionamiento

1. Al hacer `mousedown` en el elemento, se activa el modo de arrastre
2. Se calcula el offset del mouse respecto a la esquina superior izquierda del elemento
3. Durante `mousemove`, se actualiza la posición del elemento basándose en la posición del mouse menos el offset
4. Al soltar (`mouseup`), se desactiva el modo de arrastre

### Ejemplos

#### Elemento arrastrable básico

```typescript
<div CDrag style="width: 200px; height: 100px; background: var(--primary-color-2); cursor: grab;">
  Arrástrame
</div>
```

#### Diálogo arrastrable

```typescript
import { Dialog, Drag } from 'catarina';

@Component({
  template: `
    <cat-dialog *ngIf="showDialog" (closs)="showDialog = false">
      <div CDrag style="padding: 16px; cursor: grab;">
        <h2>Diálogo Arrastrable</h2>
        <p>Arrastra este diálogo</p>
      </div>
    </cat-dialog>
  `,
  imports: [Dialog, Drag]
})
export class ExampleComponent {
  showDialog = true;
}
```

#### Tarjeta arrastrable

```typescript
import { Card, Drag } from 'catarina';

@Component({
  template: `
    <cat-card customClass="draggable-card">
      <div CDrag style="cursor: grab;">
        <h3>Tarjeta Arrastrable</h3>
        <p>Arrastra por este título</p>
      </div>
      <p>Contenido que no se arrastra</p>
    </cat-card>
  `,
  imports: [Card, Drag]
})
export class ExampleComponent {}
```

### Notas

- La directiva funciona mejor con elementos que tienen `position: absolute` o `position: fixed`
- Si el elemento tiene `position: static`, la directiva lo cambia automáticamente a `absolute`
- El elemento debe estar visible en el DOM cuando se aplica la directiva
- Los cálculos de posición se basan en `offsetLeft` y `offsetTop`
- La directiva escucha eventos en el `document`, no solo en el elemento, para permitir arrastrar fuera de los límites del elemento

### Limitaciones

- Solo funciona con eventos de mouse (no soporta touch events para dispositivos móviles)
- El elemento debe tener dimensiones definidas para calcular correctamente el offset
- Si el elemento está dentro de un contenedor con `overflow: hidden`, puede quedar oculto al arrastrarlo fuera

### Casos de uso comunes

1. **Diálogos modales**: Hacer que los diálogos sean arrastrables para mejorar la UX
2. **Paneles flotantes**: Crear paneles que el usuario puede reposicionar
3. **Elementos de UI personalizables**: Permitir que los usuarios organicen elementos en la interfaz
4. **Herramientas de diseño**: En aplicaciones de diseño donde se necesita mover elementos visualmente
