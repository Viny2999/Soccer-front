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

  public openTimes() {
    this.navCtrl.push(TimesPage);
  }

  public openPlacares() {
    this.navCtrl.push(PlacaresPage);
  }
}
