import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [NavBarComponent],
})
export class CoreModule {}
