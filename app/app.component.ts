import { Component } from '@angular/core';

/**
 * Composant principale de l'application
 *
 * @export
 * @class AppComponent
 */
@Component({
  moduleId: module.id,
  selector: 'mktd-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent {
  constructor() {
    console.log('Init');
  }
}
