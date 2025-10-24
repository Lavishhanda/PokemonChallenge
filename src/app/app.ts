import { Component, signal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { LayoutContainer } from './layout-container/layout-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutContainer, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('PokeAPITask');
}
