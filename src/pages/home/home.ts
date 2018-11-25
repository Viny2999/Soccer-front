import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimesPage } from "../times/times";
import { PlacaresPage } from "../placares/placares";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  public consultarTimes() {
    this.navCtrl.push(TimesPage);
  }

  public consultarPlacares() {
    this.navCtrl.push(PlacaresPage);
  }
}
