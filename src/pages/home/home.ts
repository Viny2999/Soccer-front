import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditarPage } from "../editar/editar";
import { ConsultarPage } from "../consultar/consultar";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  public editarMenu() {
    this.navCtrl.push(EditarPage);
  }

  public consultarMenu() {
    this.navCtrl.push(ConsultarPage);
  }
}
