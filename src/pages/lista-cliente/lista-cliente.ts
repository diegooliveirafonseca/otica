import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { LoadingController,ToastController } from 'ionic-angular';
import { FormClientePage } from '../form-cliente/form-cliente';
/**
 * Generated class for the ListaClientePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lista-cliente',
  templateUrl: 'lista-cliente.html',
})
export class ListaClientePage {

  clientes: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toast: ToastController) {

  }

  ionViewDidLoad() {
    this.listar();
  }



  listar() {
    let loader = this.loadingCtrl.create({
      content: "Atualizando lista de clientes..."
    });
    loader.present();

    this.backand.object.getList("cliente")
    .then((resp) => {
      this.clientes = resp.data;
      loader.dismiss();

      let toast = this.toast.create({
       message: this.clientes.length +' clientes carregados com sucesso',
       duration: 3000,
       position: 'top'
      });
      toast.present();

    }).catch((err) => {
    });
  }

  editar(c) {
    this.navCtrl.push(FormClientePage, { id: c.id });
  }

  cadastrar(){
    this.navCtrl.push(FormClientePage);
  }

  excluir(c) {
    let confirm = this.alertCtrl.create({
      title: 'Excluir cliente',
      message: 'Deseja realmente excluir este registro?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Excluindo...'
            });
            loading.present();
            this.backand.object.remove("cliente", c.id).then((resp) => {
              let toast = this.toast.create({
                message: 'cliente excluído com sucesso!',
                duration: 2000
              });
              toast.present();
              loading.dismiss();
               this.listar();
            }).catch((err) => {

            });
          }
        }
      ]
    });
    confirm.present();
  }

}
