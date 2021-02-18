import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [],
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatListModule],
  exports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatListModule],
})
export class MaterialModule {}
