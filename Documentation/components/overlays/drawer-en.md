# Drawer (`cat-drawer`)

The `Drawer` component displays a sliding side panel from any side of the screen.

### Import

```typescript
import { Drawer } from 'catarina';
```

### Basic usage

```typescript
import { Component } from '@angular/core';
import { Drawer } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Drawer],
  template: `
    <cat-drawer *ngIf="showDrawer" side="left" (closs)="showDrawer = false">
      <h2>Side Panel</h2>
      <p>Drawer content</p>
    </cat-drawer>
  `
})
export class ExampleComponent {
  showDrawer = true;
}
```

### Properties (Inputs)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `side` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Side from which the drawer slides |
| `variant` | `'surface' \| 'elevated' \| 'outlined'` | `'surface'` | Visual style of the drawer |
| `customClass` | `string` | `''` | Custom CSS class |

### Events (Outputs)

| Event | Type | Description |
|-------|------|-------------|
| `closs` | `EventEmitter<boolean>` | Emitted when the drawer is closed (always emits `false`) |

### Features

- **Close button**: Includes a close button (`x-mark`) in the top corner
- **Escape to close**: Automatically closes when pressing the `Escape` key
- **Dark background**: Shows a semi-transparent dark background that also closes the drawer on click
- **Fixed positioning**: Positioned fixed from the specified side
- **Responsive**: In vertical orientation (portrait), `top` and `bottom` drawers occupy 70% of the height

### Sizes by side

- **`left` / `right`**: 30em width, 100vh height
- **`top` / `bottom`**: 100% width, 20em height (70% in portrait)

### Examples

#### Drawer from left

```typescript
<cat-drawer *ngIf="showDrawer" side="left" (closs)="showDrawer = false">
  <h2>Side Menu</h2>
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
  </nav>
</cat-drawer>
```

#### Drawer from right

```typescript
<cat-drawer *ngIf="showDrawer" side="right" variant="elevated" (closs)="showDrawer = false">
  <h2>Settings Panel</h2>
  <p>Options here</p>
</cat-drawer>
```

#### Drawer from top

```typescript
<cat-drawer *ngIf="showDrawer" side="top" (closs)="showDrawer = false">
  <h2>Notifications</h2>
  <ul>
    <li>Notification 1</li>
  </ul>
</cat-drawer>
```

#### Drawer from bottom

```typescript
<cat-drawer *ngIf="showDrawer" side="bottom" variant="outlined" (closs)="showDrawer = false">
  <h2>Quick Actions</h2>
  <button>Action 1</button>
</cat-drawer>
```

### Notes

- The drawer must be controlled with `*ngIf` or similar to show/hide it
- The close button is absolutely positioned in the top corner
- The dark background covers the entire screen and has `z-index: 999`
- The drawer has `z-index: 1000` to be above the background
