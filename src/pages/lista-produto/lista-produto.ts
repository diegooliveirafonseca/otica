import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { FormProdutoPage } from '../form-produto/form-produto';
import { LoadingController,ToastController } from 'ionic-angular';

/**
 * Generated class for the ListaProdutoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lista-produto',
  templateUrl: 'lista-produto.html',
})
export class ListaProdutoPage {
  produtos: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toast: ToastController) {

  }

  ionViewDidLoad() {
    this.listar();
  }



  listar() {
    let loader = this.loadingCtrl.create({
      content: "Atualizando lista de produtos..."
    });
    loader.present();

    this.backand.object.getList("produto")
    .then((resp) => {
      this.produtos = resp.data;
      loader.dismiss();

      let toast = this.toast.create({
       message: this.produtos.length +' produtos carregados com sucesso',
       duration: 3000,
       position: 'top'
      });
      toast.present();

    }).catch((err) => {
    });
  }

  editar(p) {
    this.navCtrl.push(FormProdutoPage, { id: p.id });
  }

  cadastrar(){
    this.navCtrl.push(FormProdutoPage);
  }

  excluir(p) {
    let confirm = this.alertCtrl.create({
      title: 'Excluir produto',
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
            this.backand.object.remove("produto", p.id).then((resp) => {
              let toast = this.toast.create({
                message: 'Produto excluído com sucesso!',
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