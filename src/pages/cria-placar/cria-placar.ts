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
  private placarId: String;
  private timeA: String = '';
  private timeB: String = '';
  private placarA: String = '';
  private placarB: String = '';

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
    this.placarId = this.navParams.get('placarId');
    this.timeA = this.navParams.get('timeA');
    this.timeB = this.navParams.get('timeB');
    this.placarA = this.navParams.get('placarA');
    this.placarB = this.navParams.get('placarB');

    this.httpService.getAllTimes('/time')
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
            const miniA = this.resultado.timeA.toString().substring(0,3);
            const miniB = this.resultado.timeB.toString().substring(0,3);
            this.httpService.postPlacar('/placar', this.resultado.timeA, this.resultado.timeB, miniA, miniB, this.resultado.placarA, this.resultado.placarB)
              .then(res => {
                console.log(res);
                this.navCtrl.pop();
              })
              .catch((e) => console.log(e));
          } else {
            const miniA = this.resultado.timeA.toString().substring(0,3);
            const miniB = this.resultado.timeB.toString().substring(0,3);
            
            this.httpService.putPlacar('/placar/' + this.placarId, this.resultado.timeA, this.resultado.timeB, miniA, miniB, this.resultado.placarA, this.resultado.placarB)
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