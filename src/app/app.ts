import { Component, signal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LayoutContainerComponent } from './layout-container-component/layout-container-component';

@Component({
  selector: 'app-root',
  imports: [ LayoutContainerComponent, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
