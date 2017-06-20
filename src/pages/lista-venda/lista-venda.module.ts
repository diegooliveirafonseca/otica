import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaVendaPage } from './lista-venda';

@NgModule({
  declarations: [
    ListaVendaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaVendaPage),
  ],
  exports: [
    ListaVendaPage
  ]
})
export class ListaVendaPageModule {}
