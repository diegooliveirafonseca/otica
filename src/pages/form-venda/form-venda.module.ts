import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormVendaPage } from './form-venda';

@NgModule({
  declarations: [
    FormVendaPage,
  ],
  imports: [
    IonicPageModule.forChild(FormVendaPage),
  ],
  exports: [
    FormVendaPage
  ]
})
export class FormVendaPageModule {}
