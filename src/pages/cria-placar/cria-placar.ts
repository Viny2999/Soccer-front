import { Component, Inject } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Time } from '../../time';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'page-cria-placar',
  templateUrl: 'cria-placar.html',
})
export class CriaPlacarPage {

  private times : Time[] = [];

  private resultado = {
    timeA: String,
    timeB: String,
    placarA: String,
    placarB: String
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    @Inject(HttpService) public httpService: HttpService, public alert: AlertController) {}

  ionViewDidLoad() {
    this.httpService.getAllTimes('/time/all')
    .then(time => {
      this.times = time;
    })
    .catch((e) => { this.times = [];});
  }

  public criaPlacar() {
    if (this.resultado.timeA == this.resultado.timeB) {
      const alert = this.alert.create({
        title: 'Ops!',
        subTitle: 'Um time não pode competir com ele mesmo!',
        buttons: ['OK']
      })
      alert.present();
    } else {
      this.httpService.postPlacar('/placar', this.resultado.timeA, this.resultado.timeB, this.resultado.placarA, this.resultado.placarB)
      .then(res => {
        console.log(res);
      })
      .catch((e) => console.log(e));
    }
    console.log(this.resultado)
  }

  public getTimes(): Time[] {
    return this.times;
  } 

}