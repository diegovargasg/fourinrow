import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardComponent } from './modules/board/board.component';
import { HeaderComponent } from './shared/header/header.component';
import { JoinComponent } from './modules/join/join.component';
import { ResultComponent } from './modules/result/result.component';
import { CreateComponent } from './modules/create/create.component';
import { HomeComponent } from './modules/home/home.component';
import { WaitingComponent } from './modules/waiting/waiting.component';
import { ConnectionService } from './core/connection/connection.service';
import { ConnectionSocketService } from './core/connection/connection.socket.service';
import { GameService } from './core/services/game.service';
import { PlayerService } from './core/services/player.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';

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
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    { provide: ConnectionService, useClass: ConnectionSocketService },
    GameService,
    PlayerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
