# Catarina - Introducción

## ¿Qué es Catarina?

**Catarina** es un sistema de diseño (design system) de código abierto para Angular 20.3.x que proporciona un conjunto completo de componentes UI reutilizables, modernos y accesibles. Está diseñado para ayudar a los desarrolladores a construir aplicaciones Angular de manera rápida y consistente, manteniendo un alto estándar de calidad visual y de experiencia de usuario.

## Características principales

### 🎨 Componentes de diseño
- **Icon** (`cat-icon`): Sistema de iconos flexible y personalizable
- **Button** (`cat-button`): Botones con múltiples variantes y tamaños
- **Paneles**: Card, Accordion y AccordionGroup para organizar contenido

### 📝 Componentes de formulario
Catarina incluye una amplia gama de componentes de entrada de datos:
- `cat-input`: Campo de texto estándar
- `color-input`: Selector de color
- `select-input`: Lista desplegable
- `date-input`: Selector de fecha
- `file-input`: Carga de archivos
- `password-input`: Campo de contraseña
- `range-input`: Control deslizante
- `text-area-input`: Área de texto multilínea
- `time-input`: Selector de hora

### 🎭 Overlays
Componentes modales y de superposición:
- **Dialog**: Cuadros de diálogo modales
- **Drawer**: Paneles laterales deslizantes
- **Menu**: Menús contextuales y desplegables

### 🛠️ Utilidades
- **Directiva de arrastre** (`drag`): Para implementar funcionalidad de arrastrar y soltar
- **Theming**: Sistema de temas personalizable
- **ICON_PROVIDER**: Token para configurar proveedores de iconos

## Código abierto

Catarina es un proyecto de código abierto licenciado bajo **MIT License**. Esto significa que:

- ✅ Puedes usarlo libremente en proyectos comerciales y personales
- ✅ Puedes modificarlo según tus necesidades
- ✅ Puedes contribuir al proyecto
- ✅ El código fuente está disponible públicamente en [GitHub](https://github.com/Hydenaky/library-workspace)

## Requisitos del sistema

Catarina está diseñado para trabajar con:

- **Angular**: Versión 20.3.0 o superior
- **Node.js**: Compatible con las versiones soportadas por Angular 20
- **TypeScript**: Versión compatible con Angular 20

### Dependencias peer

Catarina declara las siguientes dependencias peer que deben estar instaladas en tu proyecto:

- `@angular/core`: `^20.3.0`
- `@angular/common`: `^20.3.0`

### Dependencias directas

- `tslib`: `^2.3.0`

## Integración con safirial-icons

Catarina está diseñado para trabajar en conjunto con **safirial-icons**, un paquete de iconos SVG que proporciona una colección de iconos listos para usar. Los componentes de Catarina que utilizan iconos pueden configurarse para resolver las rutas de iconos desde `safirial-icons` mediante el token `ICON_PROVIDER`.

## Versión actual

La versión actual de Catarina es **1.1.0**.

## Recursos adicionales

- **Repositorio**: [GitHub](https://github.com/Hydenaky/library-workspace)
- **Preview en vivo**: [Ver preview](https://jpcn-portfolio.vercel.app/catarina-preview)
- **Issues y soporte**: [GitHub Issues](https://github.com/Hydenaky/library-workspace/issues)

## Próximos pasos

Para comenzar a usar Catarina en tu proyecto, consulta la guía de [Get Started](./get-started-es.md) que te guiará paso a paso en la instalación y configuración inicial.
