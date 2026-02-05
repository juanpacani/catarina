# Menu (`cat-menu`)

El componente `Menu` muestra un menú horizontal con gestión automática de overflow. Los elementos que no caben se mueven a un dropdown "More".

### Importación

```typescript
import { Menu } from 'catarina';
```

### Uso básico

```typescript
import { Component } from '@angular/core';
import { Menu, Button } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Menu, Button],
  template: `
    <cat-menu>
      <cat-button variant="primary">Item 1</cat-button>
      <cat-button variant="primary">Item 2</cat-button>
      <cat-button variant="primary">Item 3</cat-button>
    </cat-menu>
  `
})
export class ExampleComponent {}
```

### Propiedades (Inputs)

Actualmente el componente `Menu` no expone propiedades de entrada. El componente funciona como contenedor para sus hijos y gestiona automáticamente el overflow.

### Características

- **Gestión automática de overflow**: Detecta automáticamente elementos que no caben en una fila
- **Botón "More"**: Muestra un botón "More" cuando hay elementos en overflow
- **Dropdown**: Los elementos en overflow se mueven a un dropdown que se abre/cierra
- **Responsive**: Se adapta automáticamente al tamaño del contenedor
- **Observadores**: Usa `ResizeObserver` y `MutationObserver` para detectar cambios
- **Cierre automático**: El dropdown se cierra al hacer clic fuera o al seleccionar un elemento

### Funcionamiento

1. El menú detecta elementos que no caben en la primera fila
2. Oculta esos elementos y muestra el botón "More"
3. Al hacer clic en "More", se abre un dropdown con los elementos ocultos
4. Los elementos se mueven dinámicamente entre el menú y el dropdown
5. Al seleccionar un elemento del dropdown, se cierra automáticamente

### Ejemplos

#### Menú básico

```typescript
<cat-menu>
  <cat-button variant="primary">Home</cat-button>
  <cat-button variant="primary">About</cat-button>
  <cat-button variant="primary">Contact</cat-button>
</cat-menu>
```

#### Menú con muchos elementos (overflow)

```typescript
<cat-menu>
  <cat-button variant="secondary">Item 1</cat-button>
  <cat-button variant="secondary">Item 2</cat-button>
  <cat-button variant="secondary">Item 3</cat-button>
  <cat-button variant="secondary">Item 4</cat-button>
  <cat-button variant="secondary">Item 5</cat-button>
  <cat-button variant="secondary">Item 6</cat-button>
  <!-- Los que no caben irán al dropdown "More" -->
</cat-menu>
```

### Notas

- El menú funciona mejor con elementos del mismo tamaño
- Los elementos deben ser hijos directos del `Menu`
- El dropdown se posiciona automáticamente debajo del botón "More"
- Los event listeners de Angular se preservan cuando los elementos se mueven al dropdown
- El componente es completamente responsive y se adapta a cambios de tamaño

### Detalles técnicos

- Usa `ResizeObserver` para detectar cambios de tamaño del contenedor
- Usa `MutationObserver` para detectar cambios en el contenido
- Calcula qué elementos están en la primera fila comparando posiciones `top`
- Los elementos se mueven físicamente al DOM del dropdown (no se clonan)
- El botón "More" muestra un icono chevron que cambia según el estado del dropdown
