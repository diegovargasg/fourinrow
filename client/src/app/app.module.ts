import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardComponent } from './board/board.component';
import { HeaderComponent } from './header/header.component';
import { JoinComponent } from './join/join.component';
import { ResultComponent } from './result/result.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { WaitingComponent } from './waiting/waiting.component';
import { ConnectionService } from './core/connection/connection.service';
import { ConnectionSocketService } from './core/connection/connection.socket.service';
import { GameService } from './core/services/game.service';
import { PlayerService } from './core/services/player.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    HeaderComponent,
    JoinComponent,
    ResultComponent,
    CreateComponent,
    HomeComponent,
    WaitingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: ConnectionService, useClass: ConnectionSocketService },
    GameService,
    PlayerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
