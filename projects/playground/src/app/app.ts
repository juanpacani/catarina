import { Component, OnInit, signal } from '@angular/core';
import { Button, Icon } from 'safirial';
import { 
  Button as CButton, 
  Icon as CIcon, 
  Theming, 
  Card as CCard,
  TextInput as CTextInput,
} from 'catarina';
import { NgFor } from '@angular/common';
//import { getIconPath } from 'safirial-icons';

@Component({
  selector: 'app-root',
  imports: [CButton, NgFor, CCard, CTextInput],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('playground');
  
  clickCount = 0;

  color: string = '#A40000';
  isDark: boolean = false;

  constructor(
    private theming: Theming
  ) {}

  ngOnInit(): void {
    this.theming.generatePalettes(this.color, this.isDark);
  }
  
  handleTheme() {
    this.theming.calculateDynamicPalettes(this.isDark);
    this.isDark = !this.isDark;
  }

  counterEvent() {
    this.clickCount++;
  }
}