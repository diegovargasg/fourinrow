import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    const colors = environment.theme_colors;
    const i = Math.floor(Math.random() * colors.length);
    this.document.body.classList.add(`${colors[i]}-theme`);
  }
}
