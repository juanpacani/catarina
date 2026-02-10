import { Component, Input, inject, signal, PLATFORM_ID, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { ICON_PROVIDER } from '../../tokens/icon-provider.token';

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
  isVisible = signal<boolean>(false);

  @Input() size: string = '1em';
  @Input() color = 'currentColor';

  ngOnDestroy() {
    this.abortController?.abort();
  }

  // Usa el nombre del icono con el provider configurado
  @Input() set name(iconName: string) {
    if (!iconName) {
      this.isVisible.set(false);
      return;
    }

    const path = this.iconProvider.getPath(iconName);

    // Cancela la petición anterior si existe
    this.abortController?.abort();

    // Si el path es el fallback por defecto (icons/), no muestra nada
    if (!path || path.startsWith('icons/')) {
      this.isVisible.set(false);
      return;
    }

    this.loadSvg(path);
  }

  // Usa el path directo del icono
  @Input() set src(path: string) {
    if (!path) {
      this.isVisible.set(false);
      return;
    }
    
    // Cancela la petición anterior si existe
    this.abortController?.abort();
    this.loadSvg(path);
  }

  private loadSvg(path: string) {
    // En SSR, no muestra nada
    if (!isPlatformBrowser(this.platformId)) {
      this.isVisible.set(false);
      return;
    }

    // Limpia el contenido y oculta el icono mientras carga
    this.isLoading.set(true);
    this.svgContent.set('');
    this.isVisible.set(false);

    // Crea un nuevo AbortController para esta petición
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
        // Verifica que el contenido sea un SVG válido
        if (!this.isValidSvg(svg)) {
          console.error(`Invalid SVG received from ${path}. Response is not valid SVG.`);
          this.isVisible.set(false);
          return;
        }

        const processed = this.processSvg(svg);
        if (processed) {
          this.svgContent.set(this.sanitizer.bypassSecurityTrustHtml(processed));
          this.isVisible.set(true);
        } else {
          this.isVisible.set(false);
        }
      })
      .catch((error) => {
        // Ignora el error de abort
        if (error.name === 'AbortError') {
          return;
        }
        
        console.error(`Error loading icon from ${path}:`, error.message);
        this.isVisible.set(false);
      })
      .finally(() => {
        this.isLoading.set(false);
      });
  }

  private isValidSvg(content: string): boolean {
    // Realiza validaciones estrictas para asegurar que sea SVG
    const trimmed = content.trim();
    
    // 1. Verifica que comience con <svg (ignorando espacios y declaraciones XML)
    const svgRegex = /^\s*(<\?xml[^>]*>\s*)?<\s*svg\b/i;
    if (!svgRegex.test(trimmed)) {
      return false;
    }

    // 2. Verifica que termine con </svg>
    if (!trimmed.includes('</svg>')) {
      return false;
    }

    // 3. Verifica que no contenga <html>, <head>, <body> (indicaría HTML completo)
    const htmlTags = ['<html', '<head', '<body', '<!DOCTYPE html'];
    for (const tag of htmlTags) {
      if (trimmed.toLowerCase().includes(tag.toLowerCase())) {
        return false;
      }
    }

    // 4. Verifica que tenga un tamaño razonable para un icono (máximo 100KB)
    if (content.length > 100 * 1024) {
      console.warn('SVG file is too large for an icon:', content.length, 'bytes');
      return false;
    }

    return true;
  }

  private processSvg(svg: string): string | null {
    // Valida el SVG antes de procesarlo
    if (!this.isValidSvg(svg)) {
      return null;
    }

    // En SSR, usa procesamiento simple con regex (no hay DOMParser)
    if (!isPlatformBrowser(this.platformId)) {
      return this.processSvgWithRegex(svg);
    }

    // En Browser, usa DOMParser para procesamiento robusto
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svg, 'image/svg+xml');
      
      // Verifica que no haya errores de parseo
      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        console.error('SVG parsing error:', parserError.textContent);
        return null;
      }

      const svgElement = doc.querySelector('svg');
      if (!svgElement) {
        return null;
      }

      // Verifica que sea realmente un elemento SVG
      if (svgElement.tagName.toLowerCase() !== 'svg') {
        return null;
      }

      // Modifica solo el elemento <svg> raíz
      svgElement.removeAttribute('width');
      svgElement.removeAttribute('height');

      // Cambia fill y stroke solo si no son "none"
      const currentFill = svgElement.getAttribute('fill');
      if (currentFill && currentFill !== 'none') {
        svgElement.setAttribute('fill', 'currentColor');
      }

      const currentStroke = svgElement.getAttribute('stroke');
      if (currentStroke && currentStroke !== 'none') {
        svgElement.setAttribute('stroke', 'currentColor');
      }

      // Asegura el viewBox (requerido para escalado)
      if (!svgElement.hasAttribute('viewBox')) {
        svgElement.setAttribute('viewBox', '0 0 24 24');
      }

      // Serializa el SVG de vuelta a string
      return new XMLSerializer().serializeToString(svgElement);
    } catch (error) {
      console.error('Error processing SVG:', error);
      return null;
    }
  }

  private processSvgWithRegex(svg: string): string {
    // Realiza procesamiento simple con regex para SSR (donde no hay DOMParser)
    let processed = svg;

    // Remueve width y height solo del tag <svg> de apertura
    processed = processed.replace(/(<svg[^>]*?)\s+width="[^"]*"/i, '$1');
    processed = processed.replace(/(<svg[^>]*?)\s+height="[^"]*"/i, '$1');

    // Cambia fill a currentColor si existe y no es "none"
    processed = processed.replace(
      /(<svg[^>]*?\s+fill=")(?!none)([^"]*)(")/i, 
      '$1currentColor$3'
    );

    // Cambia stroke a currentColor si existe y no es "none"
    processed = processed.replace(
      /(<svg[^>]*?\s+stroke=")(?!none)([^"]*)(")/i, 
      '$1currentColor$3'
    );

    // Asegura el viewBox si no existe
    if (!/viewBox=/i.test(processed)) {
      processed = processed.replace(
        /(<svg[^>]*?)>/i, 
        '$1 viewBox="0 0 24 24">'
      );
    }

    return processed;
  }
}