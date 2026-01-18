import { Component, Input, inject, signal, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { ICON_PROVIDER } from '../../tokens/icon-provider.token';

const ICON_NOT_FOUND_SVG = `
<svg viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" 
  aria-labelledby="placeholderIconTitle" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
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
export class Icon {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);
  private iconProvider = inject(ICON_PROVIDER);

  svgContent = signal<SafeHtml>('');

  @Input() size = '24px';
  @Input() color = 'currentColor';

  // Usar nombre (con provider)
  @Input() set name(iconName: string) {
    if (!iconName) return;

    const path = this.iconProvider.getPath(iconName);

    // Si el path es el fallback por defecto (icons/), no intentes cargarlo
    if (!path || path.startsWith('icons/')) {
      this.showPlaceholder();
      return;
    }

    this.loadSvg(path);
  }

  // Usar path directo
  @Input() set src(path: string) {
    this.loadSvg(path);
  }

  private loadSvg(path: string) {

    if (!isPlatformBrowser(this.platformId)) return;

    this.http.get(path, { responseType: 'text' }).subscribe({
      next: (svg) => {
        const processed = this.processSvg(svg);
        this.svgContent.set(this.sanitizer.bypassSecurityTrustHtml(processed));
      },
      error: (err) => {
        console.error(`Error loading icon from ${path}:`, err);
        this.showPlaceholder();
      }
    });
  }

  private showPlaceholder(): void {
    const processed = this.processSvg(ICON_NOT_FOUND_SVG);
    this.svgContent.set(this.sanitizer.bypassSecurityTrustHtml(processed));
  }

  private processSvg(svg: string): string {
    // Crear un parser DOM temporal
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');

    if (!svgElement) return svg;

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

    // Serializar de vuelta a string
    return new XMLSerializer().serializeToString(svgElement);
  }
}