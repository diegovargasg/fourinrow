import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardComponent } from './modules/game/board/board.component';
import { HeaderComponent } from './shared/header/header.component';
import { JoinComponent } from './modules/join/join.component';
import { ResultComponent } from './modules/game/result/result.component';
import { CreateComponent } from './modules/create/create.component';
import { HomeComponent } from './modules/home/home.component';
import { WaitingComponent } from './modules/game/waiting/waiting.component';
import { ConnectionService } from './core/connection/connection.service';
import { ConnectionSocketService } from './core/connection/connection.socket.service';
import { GameService } from './core/services/game.service';
import { PlayerService } from './core/services/player.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';
import { GameComponent } from './modules/game/game.component';

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
    GameComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
