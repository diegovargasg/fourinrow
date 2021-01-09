import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './modules/board/board.component';
import { HeaderComponent } from './shared/header/header.component';
import { JoinComponent } from './modules/join/join.component';
import { ResultComponent } from './modules/result/result.component';
import { CreateComponent } from './modules/create/create.component';
import { HomeComponent } from './modules/home/home.component';
import { WaitingComponent } from './modules/waiting/waiting.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateComponent },
  { path: 'waiting', component: WaitingComponent },
  { path: 'result', component: ResultComponent },
  { path: 'join', component: JoinComponent },
  { path: 'board', component: BoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
