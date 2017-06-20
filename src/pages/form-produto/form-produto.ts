import { Component } from '@angular/core';
import { LoadingController, ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { ListaProdutoPage } from '../lista-produto/lista-produto';
/**
 * Generated class for the FormProdutoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-form-produto',
  templateUrl: 'form-produto.html',
})
export class FormProdutoPage {
  //objeto que ira receber os dados do formulario
  produto: any;
  //no construtor inserimos os recursos que ser"ao utilizados na aplicação
  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService, public loadingCtrl: LoadingController) {
   //inicializa o objeto produto - obrigatorio
    this.produto = {};
    // na edicao pega o ID passado como parametro
    let id  = this.navParams.get("id");
    // if nao for edicao este parametro sera undefined mas se for ele contera o ID do produto
    if(id!=undefined){
      // apenas mostra uma msg para o usuario
      let loading = this.loadingCtrl.create({
          content: 'Recuperando informações...'
      });
      loading.present();
      // busca um registro especifico pelo ID
      this.backand.object.getOne("produto",id).then((resp)=>{
        // obtem o objeto e adiciona na variavel produto
        this.produto = resp.data;
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

    // se o produto tiver um ID é pq ele já foi cadastrado e esta operação é de UPDATE - Atualizar
    if( this.produto.id!=undefined){
      // invoca a função atualizar
       this.atualizar(loading);
    }else{
      // caso o produto n"oa tenhan ID é pq ele nao foi cadastrado, logo CRIAR"
       this.criar(loading);
    }
  }

  criar(loading){
    // apenas cria um produto
     this.backand.object.create("produto", this.produto).then((resp) => {
      loading.dismiss();
      // apos criar o produto, vai para a tela de Lista
      this.navCtrl.setRoot(ListaProdutoPage);
    }).catch((err) => {
      console.log(err);
    });
  }

  atualizar(loading){
    // apenas atualiza o produto
       this.backand.object.update("produto",this.produto.id, this.produto).then((resp) => {
      loading.dismiss();
       // apos atualizar o produto, vai para a tela de Lista
      this.navCtrl.setRoot(ListaProdutoPage);
    }).catch((err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormProdutoPage');
  }

}