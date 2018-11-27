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

  ionViewDidEnter() {
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
    this.navCtrl.push(CriaPlacarPage, {id: '1', placar: null});
  }

  public editarPlacar(placar) {
    const alert = this.alert.create({
      title: 'Você deseja...',
      buttons: [
        { 
          text: 'Editar',
          handler: () => {
            this.navCtrl.push(CriaPlacarPage, {id: '2', placar: placar._id});
          }
        }, 
        { 
          text: 'Excluir',
          handler: () => {
            this.httpService.deletePlacar('/placar/' + placar._id)
            .then(res => {
              this.ionViewDidEnter()
            })
            .catch((e) => console.log(e));
          }
        }
      ]
    });
    alert.present();
    
  }

  public getPlacares(): Placar[] {
    return this.placares;
  }

}
