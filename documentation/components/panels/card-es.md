# Card (`cat-card`)

El componente `Card` es un contenedor versátil para agrupar contenido relacionado.

### Importación

```typescript
import { Card } from 'catarina';
```

### Uso básico

```typescript
import { Component } from '@angular/core';
import { Card } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Card],
  template: `
    <cat-card>
      <h2>Título</h2>
      <p>Contenido de la tarjeta</p>
    </cat-card>
  `
})
export class ExampleComponent {}
```

### Propiedades (Inputs)

| Propiedad | Tipo | Valor por defecto | Descripción |
|-----------|------|-------------------|-------------|
| `variant` | `'surface' \| 'outlined' \| 'elevated'` | `'surface'` | Estilo visual de la tarjeta |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño de la tarjeta |
| `width` | `string` | `'auto'` | Ancho de la tarjeta (cualquier valor CSS válido) |
| `customClass` | `string` | `''` | Clase CSS personalizada |

### Variantes

- **`surface`**: Fondo con color de superficie
- **`outlined`**: Borde visible con fondo transparente
- **`elevated`**: Sombra elevada para dar profundidad

### Tamaños

- **`sm`**: Pequeño
- **`md`**: Mediano - por defecto
- **`lg`**: Grande

### Ejemplos

#### Tarjeta básica

```typescript
<cat-card>
  <h3>Mi Tarjeta</h3>
  <p>Contenido aquí</p>
</cat-card>
```

#### Tarjeta con variante

```typescript
<cat-card variant="elevated" size="lg">
  <h3>Tarjeta Elevada</h3>
  <p>Esta tarjeta tiene sombra</p>
</cat-card>
```

#### Tarjeta con ancho personalizado

```typescript
<cat-card width="400px" variant="outlined">
  <h3>Tarjeta con Ancho Fijo</h3>
  <p>Ancho de 400px</p>
</cat-card>
```

#### Tarjeta con clase personalizada

```typescript
<cat-card customClass="my-card" variant="surface">
  <h3>Tarjeta Personalizada</h3>
  <p>Estilos personalizados aplicados</p>
</cat-card>
```

```scss
cat-card[data-card-class="my-card"] {
  width: 100%;
  height: 100%;

  ::ng-deep {
    > section {
      background-color: var(--neutral-color-1);
      padding: 16px;
      border-radius: 18px;
    }
  }
}
```

### Atributos de datos expuestos

El componente expone los siguientes atributos de datos para estilos personalizados:

- `data-card-variant`: La variante actual
- `data-card-size`: El tamaño actual
- `data-card-class`: La clase personalizada
