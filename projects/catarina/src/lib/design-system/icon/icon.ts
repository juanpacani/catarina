import { Component, Input, inject, signal, PLATFORM_ID, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { ICON_PROVIDER } from '../../tokens/icon-provider.token';

const ICON_NOT_FOUND_SVG = `
<svg viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" 
  aria-labelledby="placeholderIconTitle" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
  <title id="placeholderIconTitle">Icon not found</title>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier"> 
    <rect width="18" height="18" x="3" y="3"></rect>
    <path stroke-linecap="round" d="M21 21L3 3 21 21zM21 3L3 21 21 3z"></path> 
  </g>
</svg>
`;

@Component({
  selector: 'cat-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon implements OnDestroy {
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);
  private iconProvider = inject(ICON_PROVIDER);

  private abortController?: AbortController;
  
  svgContent = signal<SafeHtml>('');
  isLoading = signal<boolean>(false);

  @Input() size: string = '1em';
  @Input() color = 'currentColor';

  ngOnDestroy() {
    this.abortController?.abort();
  }

  // Usar nombre (con provider)
  @Input() set name(iconName: string) {
    if (!iconName) return;

    const path = this.iconProvider.getPath(iconName);

    // Cancelar petición anterior si existe
    this.abortController?.abort();

    // Si el path es el fallback por defecto (icons/), no intentes cargarlo
    if (!path || path.startsWith('icons/')) {
      this.showPlaceholder();
      return;
    }

    this.loadSvg(path);
  }

  // Usar path directo
  @Input() set src(path: string) {
    if (!path) return;
    
    // Cancelar petición anterior si existe
    this.abortController?.abort();
    this.loadSvg(path);
  }

  private loadSvg(path: string) {
    // En SSR, mostrar placeholder inmediatamente
    if (!isPlatformBrowser(this.platformId)) {
      this.showPlaceholder();
      return;
    }

    // Limpiar contenido y mostrar estado de carga
    this.isLoading.set(true);
    this.svgContent.set('');

    // Crear nuevo AbortController para esta petición
    this.abortController = new AbortController();

    fetch(path, { 
      signal: this.abortController.signal,
      mode: 'cors',
      cache: 'default'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.text();
      })
      .then(svg => {
        // VALIDACIÓN CRÍTICA: Verificar que sea un SVG
        if (!this.isValidSvg(svg)) {
          console.error(`Invalid SVG received from ${path}. Response is not valid SVG.`);
          this.showPlaceholder();
          return;
        }

        const processed = this.processSvg(svg);
        if (processed) {
          this.svgContent.set(this.sanitizer.bypassSecurityTrustHtml(processed));
        } else {
          this.showPlaceholder();
        }
      })
      .catch((error) => {
        // Ignorar errores de abort (son esperados)
        if (error.name === 'AbortError') {
          return;
        }
        
        console.error(`Error loading icon from ${path}:`, error.message);
        this.showPlaceholder();
      })
      .finally(() => {
        this.isLoading.set(false);
      });
  }

  private showPlaceholder(): void {
    this.isLoading.set(false);
    const processed = this.processSvg(ICON_NOT_FOUND_SVG);
    if (processed) {
      this.svgContent.set(this.sanitizer.bypassSecurityTrustHtml(processed));
    }
  }

  private isValidSvg(content: string): boolean {
    // Validaciones estrictas para asegurar que sea SVG
    const trimmed = content.trim();
    
    // 1. Debe comenzar con <svg (ignorando espacios y declaraciones XML)
    const svgRegex = /^\s*(<\?xml[^>]*>\s*)?<\s*svg\b/i;
    if (!svgRegex.test(trimmed)) {
      return false;
    }

    // 2. Debe terminar con </svg>
    if (!trimmed.includes('</svg>')) {
      return false;
    }

    // 3. No debe contener <html>, <head>, <body> (indicaría HTML completo)
    const htmlTags = ['<html', '<head', '<body', '<!DOCTYPE html'];
    for (const tag of htmlTags) {
      if (trimmed.toLowerCase().includes(tag.toLowerCase())) {
        return false;
      }
    }

    // 4. Tamaño razonable para un icono (máximo 100KB)
    if (content.length > 100 * 1024) {
      console.warn('SVG file is too large for an icon:', content.length, 'bytes');
      return false;
    }

    return true;
  }

  private processSvg(svg: string): string | null {
    // Validar antes de procesar
    if (!this.isValidSvg(svg)) {
      return null;
    }

    // En SSR, usar procesamiento simple con regex (no hay DOMParser)
    if (!isPlatformBrowser(this.platformId)) {
      return this.processSvgWithRegex(svg);
    }

    // En Browser, usar DOMParser para procesamiento robusto
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svg, 'image/svg+xml');
      
      // Verificar que no haya errores de parseo
      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        console.error('SVG parsing error:', parserError.textContent);
        return null;
      }

      const svgElement = doc.querySelector('svg');
      if (!svgElement) {
        return null;
      }

      // Verificar que sea realmente un elemento SVG
      if (svgElement.tagName.toLowerCase() !== 'svg') {
        return null;
      }

      // Modificar solo el elemento <svg> raíz
      svgElement.removeAttribute('width');
      svgElement.removeAttribute('height');

      // Cambiar fill y stroke solo si no son "none"
      const currentFill = svgElement.getAttribute('fill');
      if (currentFill && currentFill !== 'none') {
        svgElement.setAttribute('fill', 'currentColor');
      }

      const currentStroke = svgElement.getAttribute('stroke');
      if (currentStroke && currentStroke !== 'none') {
        svgElement.setAttribute('stroke', 'currentColor');
      }

      // Asegurar viewBox (requerido para escalado)
      if (!svgElement.hasAttribute('viewBox')) {
        svgElement.setAttribute('viewBox', '0 0 24 24');
      }

      // Serializar de vuelta a string
      return new XMLSerializer().serializeToString(svgElement);
    } catch (error) {
      console.error('Error processing SVG:', error);
      return null;
    }
  }

  private processSvgWithRegex(svg: string): string {
    // Procesamiento simple con regex para SSR (donde no hay DOMParser)
    let processed = svg;

    // Remover width y height solo del tag <svg> de apertura
    processed = processed.replace(/(<svg[^>]*?)\s+width="[^"]*"/i, '$1');
    processed = processed.replace(/(<svg[^>]*?)\s+height="[^"]*"/i, '$1');

    // Cambiar fill a currentColor si existe y no es "none"
    processed = processed.replace(
      /(<svg[^>]*?\s+fill=")(?!none)([^"]*)(")/i, 
      '$1currentColor$3'
    );

    // Cambiar stroke a currentColor si existe y no es "none"
    processed = processed.replace(
      /(<svg[^>]*?\s+stroke=")(?!none)([^"]*)(")/i, 
      '$1currentColor$3'
    );

    // Asegurar viewBox si no existe
    if (!/viewBox=/i.test(processed)) {
      processed = processed.replace(
        /(<svg[^>]*?)>/i, 
        '$1 viewBox="0 0 24 24">'
      );
    }

    return processed;
  }
}