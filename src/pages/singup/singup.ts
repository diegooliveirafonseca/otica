import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'
/**
 * Generated class for the SingupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage {
  email:string = '';
  firstName:string = '';
  lastName:string = '';
  signUpPassword: string = '';
  confirmPassword: string = '';
  userData: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,public backand: BackandService) {
    console.log('signup');

  }

  public signUp() {
    if (this.signUpPassword != this.confirmPassword){
      alert('Senhas diferentes');
      return;
    }
    this.backand.signup(this.firstName, this.lastName, this.email, this.signUpPassword, this.confirmPassword)
      .then((res: any) => {
          console.log(res);
          //alert('Sign up succeeded');
          //this.email = this.signUpPassword = this.confirmPassword = this.firstName = this.lastName = '';
      },
      (err: any) => {
        alert(err.data)
      }
    );
  }

}
