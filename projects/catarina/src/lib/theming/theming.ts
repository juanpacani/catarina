import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface RGB {
  red: number;
  green: number;
  blue: number;
}

@Injectable({
  providedIn: 'root'
})
export class Theming {
  //Light Theme = False
  private activeThemeSubject = new BehaviorSubject<boolean>(false);
  public activeTheme$ = this.activeThemeSubject.asObservable();

  //Palettes
  private allPalettesSubject = new BehaviorSubject<string[][]>([]);
  public allPalettes$ = this.allPalettesSubject.asObservable();

  generatePalettes(color: string, dark: boolean): string[][] {
    this.activeThemeSubject.next(dark);

    //Step 1: Calculate the Color
    const colors = this.hexToRgb(color);

    //Step 2: Get the Primary Palette (static, doesn't change with theme)
    const primaryColors: string[] = this.palette(colors, false, 4); // Always use light theme

    //Step 3: Calculate dynamic palettes (neutral and elements)
    const dynamicPalettes = this.calculateDynamicPalettes(dark);

    //Step 4: Assign All Palettes to Local Variables
    let allPalettes: string[][] = [primaryColors];

    allPalettes = allPalettes.concat([dynamicPalettes.neutral]);
    allPalettes = allPalettes.concat([dynamicPalettes.elements]);

    this.allPalettesSubject.next(allPalettes);

    //Apply theme
    this.applyTheme(allPalettes);
    
    return this.allPalettesSubject.value;
  }

  public calculateDynamicPalettes(dark: boolean): { neutral: string[], elements: string[] } {
    const theme: boolean = dark;
    const contrastTheme: boolean = !dark;

    // Calculate neutral colors (changes with theme)
    const neutralColors: string[] = contrastTheme
      ? this.palette({ red: 255, green: 255, blue: 255 }, false, 9)
      : this.palette({ red: 0, green: 0, blue: 0 }, true, 9);

    // Calculate element colors (changes with theme)
    const elementsColors: string[] = this.elementsColors(theme, 3, 40);

    // Update palettes array with dynamic values
    const allPalettes = [
      this.allPalettesSubject.value[0], // Keep primary (static)
      neutralColors,
      elementsColors
    ];

    this.allPalettesSubject.next(allPalettes);

    // Apply theme to CSS variables
    this.applyTheme(allPalettes);
    
    console.log(this.allPalettesSubject.value);
    return {
      neutral: neutralColors,
      elements: elementsColors
    };
  }

  private palette(colors: { red: number, green: number, blue: number }, dark: boolean, steps: number) {
    //Palette
    const colorsReturn: string[] = [];

    const contrastTheme: boolean = !dark;
    const target = contrastTheme ? 0 : 255;

    const umbralR = (target - colors.red) / steps;
    const umbralG = (target - colors.green) / steps;
    const umbralB = (target - colors.blue) / steps;

    for (let i = 0; i <= steps; i++) {
      const r = Math.round(colors.red + umbralR * i);
      const g = Math.round(colors.green + umbralG * i);
      const b = Math.round(colors.blue + umbralB * i);

      colorsReturn.push(`rgb(${r}, ${g}, ${b})`);
    }
    return colorsReturn;
  };

  private elementsColors(theme: boolean, iteration: number, amplitude: number) {
    amplitude = amplitude / iteration;
    const colorsReturn: string[] = [];
    for (let i = 0; i < 5; i++) {
      let r = theme ? 0 + ((85 - 0) / (5 - 1) * i) : 0 + ((255 - 0) / (5 - 1) * i);
      let g = theme ? 0 + ((85 - 0) / (5 - 1) * i) : 0 + ((255 - 0) / (5 - 1) * i);
      let b = theme ? 0 + ((85 - 0) / (5 - 1) * i) : 0 + ((255 - 0) / (5 - 1) * i);

      if (i <= iteration && theme === false) {
        r = r + amplitude;
        g = g + amplitude;
        b = b + amplitude;
      } else if (theme === false) {
        r = r - amplitude;
        g = g - amplitude;
        b = b - amplitude;
      }
      colorsReturn.push(`rgb(${r}, ${g},${b})`);
    };
    return colorsReturn;
  };

  private applyTheme(palettes: string[][]): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const cssVars = [
      { prefix: '--primary-color-', index: 0 },
      { prefix: '--neutral-color-', index: 1 },
      { prefix: '--element-color-', index: 2 }
    ];

    cssVars.forEach(({ prefix, index }) => {
      palettes[index]?.forEach((color, i) => {
        root.style.setProperty(`${prefix}${i}`, color);
      });
    });
  }

  private hexToRgb(hex: string): RGB {
    const value = parseInt(hex.replace('#', ''), 16);
    return {
      red: (value >> 16) & 255,
      green: (value >> 8) & 255,
      blue: value & 255,
    };
  }
}