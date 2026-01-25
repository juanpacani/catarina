# Drawer (`cat-drawer`)

El componente `Drawer` muestra un panel lateral deslizante desde cualquier lado de la pantalla.

### Importación

```typescript
import { Drawer } from 'catarina';
```

### Uso básico

```typescript
import { Component } from '@angular/core';
import { Drawer } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Drawer],
  template: `
    <cat-drawer *ngIf="showDrawer" side="left" (closs)="showDrawer = false">
      <h2>Panel Lateral</h2>
      <p>Contenido del drawer</p>
    </cat-drawer>
  `
})
export class ExampleComponent {
  showDrawer = true;
}
```

### Propiedades (Inputs)

| Propiedad | Tipo | Valor por defecto | Descripción |
|-----------|------|-------------------|-------------|
| `side` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Lado desde el que se desliza el drawer |
| `variant` | `'surface' \| 'elevated' \| 'outlined'` | `'surface'` | Estilo visual del drawer |
| `customClass` | `string` | `''` | Clase CSS personalizada |

### Eventos (Outputs)

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `closs` | `EventEmitter<boolean>` | Se emite cuando se cierra el drawer (siempre emite `false`) |

### Características

- **Botón de cierre**: Incluye un botón de cierre (`x-mark`) en la esquina superior
- **Cierre con Escape**: Se cierra automáticamente al presionar la tecla `Escape`
- **Fondo oscuro**: Muestra un fondo oscuro semitransparente que también cierra el drawer al hacer clic
- **Posicionamiento fijo**: Se posiciona de forma fija desde el lado especificado
- **Responsive**: En orientación vertical (portrait), los drawers `top` y `bottom` ocupan 70% de la altura

### Tamaños por lado

- **`left` / `right`**: 30em de ancho, 100vh de alto
- **`top` / `bottom`**: 100% de ancho, 20em de alto (70% en portrait)

### Ejemplos

#### Drawer desde la izquierda

```typescript
<cat-drawer *ngIf="showDrawer" side="left" (closs)="showDrawer = false">
  <h2>Menú Lateral</h2>
  <nav>
    <a href="#">Inicio</a>
    <a href="#">Acerca de</a>
  </nav>
</cat-drawer>
```

#### Drawer desde la derecha

```typescript
<cat-drawer *ngIf="showDrawer" side="right" variant="elevated" (closs)="showDrawer = false">
  <h2>Panel de Configuración</h2>
  <p>Opciones aquí</p>
</cat-drawer>
```

#### Drawer desde arriba

```typescript
<cat-drawer *ngIf="showDrawer" side="top" (closs)="showDrawer = false">
  <h2>Notificaciones</h2>
  <ul>
    <li>Notificación 1</li>
  </ul>
</cat-drawer>
```

#### Drawer desde abajo

```typescript
<cat-drawer *ngIf="showDrawer" side="bottom" variant="outlined" (closs)="showDrawer = false">
  <h2>Acciones Rápidas</h2>
  <button>Acción 1</button>
</cat-drawer>
```

### Notas

- El drawer debe controlarse con `*ngIf` o similar para mostrarlo/ocultarlo
- El botón de cierre está posicionado absolutamente en la esquina superior
- El fondo oscuro cubre toda la pantalla y tiene `z-index: 999`
- El drawer tiene `z-index: 1000` para estar sobre el fondo
