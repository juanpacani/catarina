# Button (`cat-button`)

The `Button` component is a versatile button with support for icons, multiple variants, and sizes.

### Import

```typescript
import { Button } from 'catarina';
```

### Basic usage

```typescript
import { Component } from '@angular/core';
import { Button } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Button],
  template: `
    <cat-button>Click me</cat-button>
  `
})
export class ExampleComponent {}
```

### Properties (Inputs)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'contrast' \| 'outline' \| 'ghost'` | `'primary'` | Visual style of the button |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disables the button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `iconLeft` | `string?` | `undefined` | Icon name to display on the left |
| `iconCenter` | `string?` | `undefined` | Icon name to display in the center |
| `iconRight` | `string?` | `undefined` | Icon name to display on the right |
| `customClass` | `string` | `''` | Custom CSS class |

### Events (Outputs)

| Event | Type | Description |
|-------|------|-------------|
| `clicked` | `EventEmitter<MouseEvent>` | Emitted when the button is clicked (only if not disabled) |

### Variants

- **`primary`**: Primary button with accent color
- **`secondary`**: Secondary button with more subtle style
- **`contrast`**: Button with high contrast
- **`outline`**: Button with border and transparent background
- **`ghost`**: Completely transparent button, only shows text/icon

### Sizes

- **`sm`**: Small (16px icons)
- **`md`**: Medium (20px icons) - default
- **`lg`**: Large (24px icons)

### Examples

#### Button with left icon

```typescript
<cat-button variant="primary" iconLeft="home">
  Home
</cat-button>
```

#### Button with right icon

```typescript
<cat-button variant="secondary" iconRight="chevron-arrow-right">
  Next
</cat-button>
```

#### Button with center icon

```typescript
<cat-button variant="outline" iconCenter="plus" size="lg">
  Add
</cat-button>
```

#### Disabled button

```typescript
<cat-button variant="primary" [disabled]="true">
  Not available
</cat-button>
```

#### Submit button

```typescript
<cat-button type="submit" variant="primary">
  Submit form
</cat-button>
```

#### Button with custom class

```typescript
<cat-button customClass="my-custom-button" variant="primary">
  Custom
</cat-button>
```

```scss
cat-button[data-button-class="my-custom-button"] {
  ::ng-deep {
    > button {
      border-radius: 50px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
}
```

### Notes

- Icons are loaded through the configured `ICON_PROVIDER`
- Icon size is automatically adjusted based on button `size`
- The `clicked` event is not emitted if the button is `disabled`
- The component exposes `data-button-class` as an attribute for custom styles
