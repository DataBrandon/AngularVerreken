import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogComponent } from './log/log.component';
import { InputComponent} from './input/input.component';
import { from } from 'rxjs';
//import { ItemComponent } from './item/item.component';


const routes: Routes = [
  {path:'input',component:InputComponent},
  {path:'log',component:LogComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
