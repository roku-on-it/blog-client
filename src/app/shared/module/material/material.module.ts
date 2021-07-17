import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarComponent } from 'src/app/shared/component/snack-bar/snack-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [SnackBarComponent],
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
})
export class MaterialModule {}
