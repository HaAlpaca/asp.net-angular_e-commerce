import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, FontAwesomeModule,RouterModule],
  exports: [NavBarComponent],
})
export class CoreModule {}
