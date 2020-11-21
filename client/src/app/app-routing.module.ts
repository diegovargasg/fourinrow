import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { HeaderComponent } from './header/header.component';
import { JoinComponent } from './join/join.component';
import { ResultComponent } from './result/result.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { WaitingComponent } from './waiting/waiting.component';

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
