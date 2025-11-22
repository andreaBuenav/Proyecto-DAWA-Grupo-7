import { Component } from '@angular/core';
import { Menu } from '../menu/menu';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-menu',
  imports: [Menu, RouterOutlet],
  templateUrl: './layout-menu.html',
  styleUrl: './layout-menu.css',
})
export class LayoutMenu {

}
