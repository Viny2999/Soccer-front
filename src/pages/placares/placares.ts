import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-placares',
  templateUrl: 'placares.html',
})
export class PlacaresPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  public consultarPlacares() {
    console.info('Consultar Placares!');
  }

  public consultarTimes() {
    console.info('Consultar Times!');
  }

}
