import { Component } from '@angular/core';
import { ConnectionService } from './connection/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private connectionService: ConnectionService) {}

  ngOnInit() {
    this.connectionService.connect();
  }
}
