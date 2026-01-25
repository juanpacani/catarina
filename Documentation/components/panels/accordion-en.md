# Accordion (`cat-accordion`)

The `Accordion` component allows showing/hiding content in a collapsible way with a button.

### Import

```typescript
import { Accordion } from 'catarina';
```

### Basic usage

```typescript
import { Component } from '@angular/core';
import { Accordion } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Accordion],
  template: `
    <cat-accordion label="Section 1" [status]="false">
      <p>Collapsible content here</p>
    </cat-accordion>
  `
})
export class ExampleComponent {}
```

### Properties (Inputs)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `accordionId` | `string?` | `undefined` | Unique ID of the accordion (required for AccordionGroup) |
| `status` | `boolean` | `false` | Initial state (true = open, false = closed) |
| `label` | `string` | `'Accordion Name'` | Accordion button text |
| `disabled` | `boolean` | `false` | Disables the accordion |
| `customClass` | `string` | `''` | Custom CSS class |
| `width` | `string` | `'auto'` | Accordion width |
| `buttonVariant` | `'primary' \| 'secondary' \| 'contrast' \| 'outline' \| 'ghost'` | `'secondary'` | Button variant |
| `buttonSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `iconLeft` | `boolean` | `false` | Shows icon on the left |
| `iconCenter` | `boolean` | `false` | Shows icon in the center |
| `iconRight` | `boolean` | `true` | Shows icon on the right (default) |
| `scrolleable` | `boolean` | `false` | Allows scrolling in the content panel |
| `variant` | `'surface' \| 'outlined' \| 'elevated'` | `'surface'` | Content panel variant |

### Events (Outputs)

| Event | Type | Description |
|-------|------|-------------|
| `updateAccordionGroupStatusOutput` | `EventEmitter<string>` | Emits the `accordionId` when state changes (used by AccordionGroup) |

### Public methods

| Method | Description |
|--------|-------------|
| `forceStatus(newStatus: boolean): void` | Forces a specific state (used by AccordionGroup) |

### Icons

The accordion automatically shows `plus`/`minus` icons based on state:
- **Closed**: Shows `plus`
- **Open**: Shows `minus`

Icon position is controlled with `iconLeft`, `iconCenter`, and `iconRight`.

### Examples

#### Basic accordion

```typescript
<cat-accordion label="Question 1">
  <p>Answer to question 1</p>
</cat-accordion>
```

#### Accordion open by default

```typescript
<cat-accordion label="Open Section" [status]="true">
  <p>This accordion starts open</p>
</cat-accordion>
```

#### Accordion with left icon

```typescript
<cat-accordion 
  label="With Left Icon" 
  [iconLeft]="true"
  [iconRight]="false">
  <p>Content</p>
</cat-accordion>
```

#### Accordion with scroll

```typescript
<cat-accordion 
  label="Long Content" 
  [scrolleable]="true"
  variant="elevated">
  <div style="height: 300px;">
    <p>Long content that requires scrolling</p>
  </div>
</cat-accordion>
```
