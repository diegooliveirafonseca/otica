import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormClientePage } from './form-cliente';

@NgModule({
  declarations: [
    FormClientePage,
  ],
  imports: [
    IonicPageModule.forChild(FormClientePage),
  ],
  exports: [
    FormClientePage
  ]
})
export class FormClientePageModule {}
