import { InjectionToken } from '@angular/core';

export interface IconProvider {
  getPath(name: string): string;
}

export const ICON_PROVIDER = new InjectionToken<IconProvider>('ICON_PROVIDER', {
  providedIn: 'root',
  factory: () => ({
    // Fallback por defecto si no se configura
    getPath: (name: string) => `icons/${name}.svg`
  })
});
