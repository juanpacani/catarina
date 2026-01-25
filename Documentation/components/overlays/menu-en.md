# Menu (`cat-menu`)

The `Menu` component displays a horizontal menu with automatic overflow management. Items that don't fit are moved to a "More" dropdown.

### Import

```typescript
import { Menu } from 'catarina';
```

### Basic usage

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

### Properties (Inputs)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'surface' \| 'elevated' \| 'outlined'` | `'surface'` | Visual style of the menu |
| `customClass` | `string` | `''` | Custom CSS class |

### Features

- **Automatic overflow management**: Automatically detects items that don't fit in one row
- **"More" button**: Shows a "More" button when there are overflow items
- **Dropdown**: Overflow items are moved to a dropdown that opens/closes
- **Responsive**: Automatically adapts to container size
- **Observers**: Uses `ResizeObserver` and `MutationObserver` to detect changes
- **Auto-close**: Dropdown closes when clicking outside or selecting an item

### How it works

1. The menu detects items that don't fit in the first row
2. Hides those items and shows the "More" button
3. When clicking "More", a dropdown opens with the hidden items
4. Items are dynamically moved between the menu and the dropdown
5. When selecting an item from the dropdown, it automatically closes

### Examples

#### Basic menu

```typescript
<cat-menu>
  <cat-button variant="primary">Home</cat-button>
  <cat-button variant="primary">About</cat-button>
  <cat-button variant="primary">Contact</cat-button>
</cat-menu>
```

#### Menu with many items (overflow)

```typescript
<cat-menu variant="elevated">
  <cat-button variant="secondary">Item 1</cat-button>
  <cat-button variant="secondary">Item 2</cat-button>
  <cat-button variant="secondary">Item 3</cat-button>
  <cat-button variant="secondary">Item 4</cat-button>
  <cat-button variant="secondary">Item 5</cat-button>
  <cat-button variant="secondary">Item 6</cat-button>
  <!-- Items that don't fit will go to the "More" dropdown -->
</cat-menu>
```

#### Menu with custom class

```typescript
<cat-menu customClass="my-menu" variant="outlined">
  <cat-button variant="ghost">Option 1</cat-button>
  <cat-button variant="ghost">Option 2</cat-button>
</cat-menu>
```

### Notes

- The menu works best with elements of the same size
- Elements must be direct children of `Menu`
- The dropdown is automatically positioned below the "More" button
- Angular event listeners are preserved when items are moved to the dropdown
- The component is fully responsive and adapts to size changes

### Technical details

- Uses `ResizeObserver` to detect container size changes
- Uses `MutationObserver` to detect content changes
- Calculates which items are in the first row by comparing `top` positions
- Items are physically moved to the dropdown DOM (not cloned)
- The "More" button shows a chevron icon that changes based on dropdown state
