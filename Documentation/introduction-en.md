# Catarina - Introduction

## What is Catarina?

**Catarina** is an open-source design system for Angular 20.3.x that provides a comprehensive set of reusable, modern, and accessible UI components. It is designed to help developers build Angular applications quickly and consistently, while maintaining a high standard of visual quality and user experience.

## Key Features

### 🎨 Design Components
- **Icon** (`cat-icon`): Flexible and customizable icon system
- **Button** (`cat-button`): Buttons with multiple variants and sizes
- **Panels**: Card, Accordion, and AccordionGroup for organizing content

### 📝 Form Components
Catarina includes a wide range of data input components:
- `cat-input`: Standard text field
- `color-input`: Color picker
- `select-input`: Dropdown list
- `date-input`: Date picker
- `file-input`: File upload
- `password-input`: Password field
- `range-input`: Slider control
- `text-area-input`: Multiline text area
- `time-input`: Time picker

### 🎭 Overlays
Modal and overlay components:
- **Dialog**: Modal dialog boxes
- **Drawer**: Sliding side panels
- **Menu**: Contextual and dropdown menus

### 🛠️ Utilities
- **Drag directive** (`drag`): For implementing drag and drop functionality
- **Theming**: Customizable theme system
- **ICON_PROVIDER**: Token for configuring icon providers

## Open Source

Catarina is an open-source project licensed under the **MIT License**. This means:

- ✅ You can use it freely in commercial and personal projects
- ✅ You can modify it according to your needs
- ✅ You can contribute to the project
- ✅ The source code is publicly available on [GitHub](https://github.com/Hydenaky/library-workspace)

## System Requirements

Catarina is designed to work with:

- **Angular**: Version 20.3.0 or higher
- **Node.js**: Compatible with versions supported by Angular 20
- **TypeScript**: Version compatible with Angular 20

### Peer Dependencies

Catarina declares the following peer dependencies that must be installed in your project:

- `@angular/core`: `^20.3.0`
- `@angular/common`: `^20.3.0`

### Direct Dependencies

- `tslib`: `^2.3.0`

## Integration with safirial-icons

Catarina is designed to work together with **safirial-icons**, an SVG icon package that provides a collection of ready-to-use icons. Catarina components that use icons can be configured to resolve icon paths from `safirial-icons` through the `ICON_PROVIDER` token.

## Current Version

The current version of Catarina is **1.1.0**.

## Additional Resources

- **Repository**: [GitHub](https://github.com/Hydenaky/library-workspace)
- **Live Preview**: [View preview](https://jpcn-portfolio.vercel.app/catarina-preview)
- **Issues and Support**: [GitHub Issues](https://github.com/Hydenaky/library-workspace/issues)

## Next Steps

To start using Catarina in your project, check out the [Get Started](./get-started-en.md) guide that will walk you through step-by-step installation and initial configuration.
