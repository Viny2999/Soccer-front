import { Component, Inject } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { HttpService } from '../../services/http.service';
import { CriaPlacarPage } from '../cria-placar/cria-placar';
import { Placar } from '../../placar';

@Component({
  selector: 'page-placares',
  templateUrl: 'placares.html',
})
export class PlacaresPage {
  private placares : Placar[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject(HttpService) public httpService: HttpService, 
  public alert: AlertController, public loadingController: LoadingController) {}

  ionViewDidLoad() {
    const loader: Loading = this.loadingController.create({
      content: "Aguarde...",
    });
    loader.present();
    this.httpService.getAllPlacares('/placar/all')
    .then(placar => {
      this.placares = placar;
      loader.dismiss();
    })
    .catch((e) => { this.placares = [];});
  }

  public adicionarPlacar() {
    this.navCtrl.push(CriaPlacarPage);
  }

  public getPlacares(): Placar[] {
    return this.placares;
  }

}
