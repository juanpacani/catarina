import { Component, OnInit, signal } from '@angular/core';
import { Button, Icon } from 'safirial';
import { Button as CButton, Icon as CIcon, Theming, 
// Panels
Card as CCard, Accordion as CAccordion, AccordionGroup as CAccordionGroup, 
// Inputs
ColorInput as CColorInput, 
SelectInput as CSelectInput,
//Overlays
Dialog as CDialog, CatInput as CCatInput} from 'catarina';
import { NgFor, NgIf } from '@angular/common';
//import { getIconPath } from 'safirial-icons';

@Component({
  selector: 'app-root',
  imports: [
    //Angular
    NgFor,
    NgIf,

    //Components
    CButton,

    // Panels
    CCard,
    CAccordion,
    CAccordionGroup,

    //Inputs
    CColorInput,
    CCatInput,
    CSelectInput,

    //Overlays
    CDialog,
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('playground');

  clickCount = 0;

  color: string = '#A40000';
  isDark: boolean = false;


  //Dialog variables
  surfacedDialogActive: boolean = false;
  elevatedDialogActive: boolean = false;
  outlinedDialogActive: boolean = false;

  //Accordion
  accordionStatus: boolean = false;

  // Select Input
  options: string[] = ['A','B','C','D'];
  //Life Cicle Events
  constructor(
    private theming: Theming
  ) { }

  ngOnInit(): void {
    this.theming.generatePalettes(this.color, this.isDark);
    this.isDark = !this.isDark;
  }

  //Events
  //Change the colors of the theming
  handleTheme(): void {
    this.theming.calculateDynamicPalettes(this.isDark);
    this.isDark = !this.isDark;
  }

  //Just an test event for the buttons
  counterEvent(): void {
    this.clickCount++;
  }

  //Dialog Events
  openDialog(index: number) {
    switch (index) {
      case 0:
        this.surfacedDialogActive = true;
        break;
      case 1:
        this.elevatedDialogActive = true;
        break;
      case 2:
        this.outlinedDialogActive = true;
        break;
      default:
        break;
    }
  }

  closeDialog(value: boolean, index: number) {
        switch (index) {
      case 0:
        this.surfacedDialogActive = value;
        break;
      case 1:
        this.elevatedDialogActive = value;
        break;
      case 2:
        this.outlinedDialogActive = value;
        break;
      default:
        break;
    }
  }

  //Accordion Events
  switchStatus(){
    this.accordionStatus = !this.accordionStatus;
  }
}