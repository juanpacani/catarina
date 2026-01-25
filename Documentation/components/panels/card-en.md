# Card (`cat-card`)

The `Card` component is a versatile container for grouping related content.

### Import

```typescript
import { Card } from 'catarina';
```

### Basic usage

```typescript
import { Component } from '@angular/core';
import { Card } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Card],
  template: `
    <cat-card>
      <h2>Title</h2>
      <p>Card content</p>
    </cat-card>
  `
})
export class ExampleComponent {}
```

### Properties (Inputs)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'surface' \| 'outlined' \| 'elevated'` | `'surface'` | Visual style of the card |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Card size |
| `width` | `string` | `'auto'` | Card width (any valid CSS value) |
| `customClass` | `string` | `''` | Custom CSS class |

### Variants

- **`surface`**: Background with surface color
- **`outlined`**: Visible border with transparent background
- **`elevated`**: Elevated shadow for depth

### Sizes

- **`sm`**: Small
- **`md`**: Medium - default
- **`lg`**: Large

### Examples

#### Basic card

```typescript
<cat-card>
  <h3>My Card</h3>
  <p>Content here</p>
</cat-card>
```

#### Card with variant

```typescript
<cat-card variant="elevated" size="lg">
  <h3>Elevated Card</h3>
  <p>This card has shadow</p>
</cat-card>
```

#### Card with custom width

```typescript
<cat-card width="400px" variant="outlined">
  <h3>Fixed Width Card</h3>
  <p>400px width</p>
</cat-card>
```

#### Card with custom class

```typescript
<cat-card customClass="my-card" variant="surface">
  <h3>Custom Card</h3>
  <p>Custom styles applied</p>
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

### Exposed data attributes

The component exposes the following data attributes for custom styling:

- `data-card-variant`: Current variant
- `data-card-size`: Current size
- `data-card-class`: Custom class
