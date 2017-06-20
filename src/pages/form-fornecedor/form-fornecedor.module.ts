import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormFornecedorPage } from './form-fornecedor';

@NgModule({
  declarations: [
    FormFornecedorPage,
  ],
  imports: [
    IonicPageModule.forChild(FormFornecedorPage),
  ],
  exports: [
    FormFornecedorPage
  ]
})
export class FormFornecedorPageModule {}
