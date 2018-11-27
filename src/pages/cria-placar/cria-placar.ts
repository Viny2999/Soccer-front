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

  private id: String;
  private placar: String;

  private resultado = {
    timeA: String,
    timeB: String,
    placarA: String,
    placarB: String
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    @Inject(HttpService) public httpService: HttpService, public alert: AlertController) {}

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.placar = this.navParams.get('placar');

    this.httpService.getAllTimes('/time/all')
    .then(time => {
      this.times = time;
    })
    .catch((e) => { this.times = [];});
  }

  public criaPlacar() {
    if (this.resultado.timeA.toString() == 'function String() { [native code] }' || 
        this.resultado.timeB.toString() == 'function String() { [native code] }') {
          const alert = this.alert.create({
            title: 'Ops!',
            subTitle: 'Não podem haver times vazios!',
            buttons: ['OK']
          })
          alert.present();
    } else {
      if (this.resultado.timeA == this.resultado.timeB) {
        const alert = this.alert.create({
          title: 'Ops!',
          subTitle: 'Um time não pode competir com ele mesmo!',
          buttons: ['OK']
        })
        alert.present();
      } else {
        if (Number(this.resultado.placarA.toString()) >= 30 || 
            Number(this.resultado.placarB.toString()) >= 30) {
              const alert = this.alert.create({
                title: 'Ops!',
                subTitle: 'Numero muito grande de Gols!',
                buttons: ['OK']
              })
              alert.present();
        } else {
          if (this.id == '1') {
            this.httpService.postPlacar('/placar', this.resultado.timeA, this.resultado.timeB, this.resultado.placarA, this.resultado.placarB)
              .then(res => {
                console.log(res);
                this.navCtrl.pop();
              })
              .catch((e) => console.log(e));
          } else {
            this.httpService.putPlacar('/placar/' + this.placar, this.resultado.timeA, this.resultado.timeB, this.resultado.placarA, this.resultado.placarB)
            .then(res => {
              console.log(res);
              this.navCtrl.pop();
            })
            .catch((e) => console.log(e));
          }
        }
      }
    }
  }

  public getTimes(): Time[] {
    return this.times;
  } 

}