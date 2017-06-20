import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {BackandService} from '@backand/angular2-sdk'
import {ListaProdutoPage} from '../pages/lista-produto/lista-produto';
import {FormProdutoPage} from '../pages/form-produto/form-produto';
import {ListaClientePage} from '../pages/lista-cliente/lista-cliente';
import {FormClientePage} from '../pages/form-cliente/form-cliente';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ListaProdutoPage,
    FormProdutoPage,
    ListaClientePage,
    FormClientePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ListaProdutoPage,
    FormProdutoPage,
    ListaClientePage,
    FormClientePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackandService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
