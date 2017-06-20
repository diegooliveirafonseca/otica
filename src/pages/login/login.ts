import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {BackandService} from '@backand/angular2-sdk'
import { HomePage } from '../home/home';
import {SingupPage} from '../singup/singup';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  templateUrl: 'login.html',
  selector: 'page-login',
})
export class LoginPage {
    username: string = '';
    password: string = '';
    auth_type: string = "N/A";
    is_auth_error: boolean ;
    auth_status: string = null;
    loggedInUser: string = '';
    usuarioAutenticado: boolean;

  constructor(public navCtrl: NavController, public alertCtrl:AlertController,public navParams: NavParams, public backand: BackandService) {
      this.backand.user.getUserDetails().then(
      (res: any) => {
        if(res.data) {
          this.loggedInUser = res.data.username;
          this.auth_status = 'OK';
          this.auth_type = res.data.token_type == 'Anonymous' ? 'Anonymous' : 'Token';
        }
      },
      (err: any) => {
        this.loggedInUser = null;
        this.auth_status = null;
        this.auth_type = null;
      }
    );
  }

  public getAuthTokenSimple() {
        this.auth_type = 'Token';
        this.backand.signin(this.username, this.password)
        .then((res: any) => {
                this.auth_status = 'OK';
                this.is_auth_error = false;
                this.loggedInUser = this.username;
                this.username = '';
                this.password = '';
                this.logado()
            },
            (error:any) => {
                let errorMessage:string = error.data.error_description;
                this.auth_status = `Error: ${errorMessage}`;
                this.is_auth_error = true;
                this.auth_status = 'ERROR';
                this.username = '';
                this.password = '';
                this.naoLogado()
            }
        );  
    }

    logado(){
      this.navCtrl.setRoot(HomePage);
    }

    naoLogado(){
      let alert = this.alertCtrl.create({
      title: 'Login Failed',
      message: 'Você não conseguiu fazer login. Tente novamente!',
      buttons: ['Ok']
    });
    alert.present()
  }
  
  public signOut() {
    this.auth_status = null;
    this.backand.signout();
  }

  cadastrar(){
    this.navCtrl.push(SingupPage);
  }

    

}
