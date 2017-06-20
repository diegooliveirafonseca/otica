import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaProdutoPage } from './lista-produto';

@NgModule({
  declarations: [
    ListaProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaProdutoPage),
  ],
  exports: [
    ListaProdutoPage
  ]
})
export class ListaProdutoPageModule {}
