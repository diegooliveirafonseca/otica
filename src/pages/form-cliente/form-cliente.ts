import { Component } from '@angular/core';
import { LoadingController, ToastController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { ListaClientePage} from '../lista-cliente/lista-cliente';
/**
 * Generated class for the FormClientePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-form-cliente',
  templateUrl: 'form-cliente.html',
})
export class FormClientePage {

  //objeto que ira receber os dados do formulario
  cliente: any;
  //no construtor inserimos os recursos que ser"ao utilizados na aplicação
  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService, public loadingCtrl: LoadingController) {
   //inicializa o objeto cliente - obrigatorio
    this.cliente = {};
    // na edicao pega o ID passado como parametro
    let id  = this.navParams.get("id");
    // if nao for edicao este parametro sera undefined mas se for ele contera o ID do cliente
    if(id!=undefined){
      // apenas mostra uma msg para o usuario
      let loading = this.loadingCtrl.create({
          content: 'Recuperando informações...'
      });
      loading.present();
      // busca um registro especifico pelo ID
      this.backand.object.getOne("cliente",id).then((resp)=>{
        // obtem o objeto e adiciona na variavel cliente
        this.cliente = resp.data;
        //dispensa a mensagem
        loading.dismiss();
      }).catch((errp)=>{
      });
    }
  }

  cadastrar() {

    let loading = this.loadingCtrl.create({
      content: 'Salvando...'
    });
    loading.present();

    // se o cliente tiver um ID é pq ele já foi cadastrado e esta operação é de UPDATE - Atualizar
    if( this.cliente.id!=undefined){
      // invoca a função atualizar
       this.atualizar(loading);
    }else{
      // caso o cliente não tenha ID é pq ele nao foi cadastrado, logo CRIAR"
       this.criar(loading);
    }
  }

  criar(loading){
    // apenas cria um cliente
     this.backand.object.create("cliente", this.cliente).then((resp) => {
      loading.dismiss();
      // apos criar o cliente, vai para a tela de Lista
      this.navCtrl.setRoot(ListaClientePage);
    }).catch((err) => {
      console.log(err);
    });
  }

  atualizar(loading){
    // apenas atualiza o cliente
       this.backand.object.update("cliente",this.cliente.id, this.cliente).then((resp) => {
      loading.dismiss();
       // apos atualizar o cliente, vai para a tela de Lista
      this.navCtrl.setRoot(ListaClientePage);
    }).catch((err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormClientePage');
  }

}
