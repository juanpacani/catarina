# AccordionGroup (`cat-accordion-group`)

El componente `AccordionGroup` agrupa múltiples `Accordion` y controla que solo uno esté abierto a la vez (opcional).

### Importación

```typescript
import { AccordionGroup } from 'catarina';
```

### Uso básico

```typescript
import { Component } from '@angular/core';
import { Accordion, AccordionGroup } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Accordion, AccordionGroup],
  template: `
    <cat-accordion-group [singleExpand]="true">
      <cat-accordion accordionId="1" label="Sección 1">
        <p>Contenido 1</p>
      </cat-accordion>
      <cat-accordion accordionId="2" label="Sección 2">
        <p>Contenido 2</p>
      </cat-accordion>
      <cat-accordion accordionId="3" label="Sección 3">
        <p>Contenido 3</p>
      </cat-accordion>
    </cat-accordion-group>
  `
})
export class ExampleComponent {}
```

### Propiedades (Inputs)

| Propiedad | Tipo | Valor por defecto | Descripción |
|-----------|------|-------------------|-------------|
| `singleExpand` | `boolean` | `true` | Si es `true`, solo un accordion puede estar abierto a la vez |
| `customClass` | `string` | `''` | Clase CSS personalizada |

### Características

- **Expansión única**: Cuando `singleExpand` es `true`, al abrir un accordion se cierra automáticamente el anterior
- **Múltiples abiertos**: Cuando `singleExpand` es `false`, múltiples accordions pueden estar abiertos simultáneamente
- **Control automático**: Gestiona automáticamente el estado de los accordions hijos

### Requisitos

- Cada `Accordion` dentro del grupo debe tener un `accordionId` único
- Los accordions deben ser hijos directos del `AccordionGroup` (usando `ContentChildren`)

### Ejemplos

#### Grupo con expansión única (por defecto)

```typescript
<cat-accordion-group>
  <cat-accordion accordionId="a1" label="Sección A">
    <p>Contenido A</p>
  </cat-accordion>
  <cat-accordion accordionId="a2" label="Sección B">
    <p>Contenido B</p>
  </cat-accordion>
</cat-accordion-group>
```

#### Grupo con múltiples abiertos

```typescript
<cat-accordion-group [singleExpand]="false">
  <cat-accordion accordionId="b1" label="Sección 1">
    <p>Puede estar abierto junto con otros</p>
  </cat-accordion>
  <cat-accordion accordionId="b2" label="Sección 2">
    <p>Múltiples secciones abiertas</p>
  </cat-accordion>
</cat-accordion-group>
```

### Notas

- El `AccordionGroup` usa `ContentChildren` para detectar los accordions hijos
- La comunicación entre accordions y el grupo se realiza mediante eventos
- Si un accordion se hace clic cuando ya está abierto y `singleExpand` es `true`, se cierra
