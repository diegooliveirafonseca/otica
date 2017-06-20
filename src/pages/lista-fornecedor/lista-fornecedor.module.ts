import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaFornecedorPage } from './lista-fornecedor';

@NgModule({
  declarations: [
    ListaFornecedorPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaFornecedorPage),
  ],
  exports: [
    ListaFornecedorPage
  ]
})
export class ListaFornecedorPageModule {}
