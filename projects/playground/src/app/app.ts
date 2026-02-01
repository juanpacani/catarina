import { Component, OnInit, signal } from '@angular/core';
import { Button, Icon } from 'safirial';
import { Button as CButton, Icon as CIcon, Theming, 
// Panels
Card as CCard, 
Accordion as CAccordion, 
AccordionGroup as CAccordionGroup, 
// Inputs
CatInput as CCatInput,
ColorInput as CColorInput, 
SelectInput as CSelectInput,
//Overlays
Dialog as CDialog, 
Drawer as CDrawer,
Menu as CMenu,

} from 'catarina';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { iconList } from 'safirial-icons';
//import { getIconPath } from 'safirial-icons';

@Component({
  selector: 'app-root',
  imports: [
    //Angular
    NgFor,
    NgIf,
    FormsModule,

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
    CDrawer,
    CMenu,
    CIcon,
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('playground');
  iconList = iconList;

  clickCount = 0;

  color: string = '#16709c';
  isDark: boolean = false;


  //Dialog variables
  surfacedDialogActive: boolean = false;
  elevatedDialogActive: boolean = false;
  outlinedDialogActive: boolean = false;

  //Drawer
  drawerActive: boolean = false;

  //Accordion
  accordionStatus: boolean = false;

  // Select Input
  options: string[] = ['A','B','C','D'];
  value: string = '';
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

  //Input Events
  onValue(value: string) {
    console.log(value);
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

  // Drawer Events
  openDrawer() {
    this.drawerActive = true;
  }
  closeDrawer() {
    this.drawerActive = false;
  }

  //Accordion Events
  switchStatus(){
    this.accordionStatus = !this.accordionStatus;
  }
}