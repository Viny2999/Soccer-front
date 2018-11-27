import { Component, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../services/http.service";
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { Time } from '../../time';

@Component({
  selector: 'page-times',
  templateUrl: 'times.html'
})
export class TimesPage {
  private times : Time[] = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, 
    @Inject(HttpService) public httpService: HttpService, public loadingController: LoadingController) {}

  ionViewDidLoad() {
    const loader: Loading = this.loadingController.create({
      content: "Aguarde...",
    });
    loader.present();
    this.httpService.getAllTimes('/time/all')
    .then(time => {
      this.times = time;
      loader.dismiss();
    })
    .catch((e) => { this.times = [];});
  }

  public adicionarTime() {
    this.showPrompt(null,false)
  }

  public editarTime(time) {
    this.showAlert(time,true);
  }

  public getTimes(): Time[] {
    return this.times;
  }

  public showAlert(time, bool) {
    const alert = this.alert.create({
      title: 'Você deseja...',
      buttons: [
        { 
          text: 'Editar',
          handler: () => {
            this.showPrompt(time, bool);
            
          }
        }, 
        { 
          text: 'Excluir',
          handler: () => {
            this.httpService.deleteTime('/time/' + time._id)
            .then(res => {
              this.ionViewDidLoad()
            })
            .catch((e) => console.log(e));
          }
        }
      ]
    });
    alert.present();
  }

  public  showPrompt(time, bool) {
    const prompt = this.alert.create({
      title: 'Editar Time',
      message: "Digite o nome do time",
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome'
        },
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Salvar',
          handler: data => {
            if (data.nome.trim() == '') {
              const alert = this.alert.create({
                title: 'Ops!',
                subTitle: 'Você não pode criar um time vazio!',
                buttons: ['OK']
              })
              alert.present();
            } else {
              if (bool == false) {
                this.httpService.postTime('/time', data.nome)
                .then(res => {
                  this.ionViewDidLoad()
                })
                .catch((e) => console.log(e));
              } else {
                this.httpService.putTime('/time/' + time._id, data.nome)
                .then(res => {
                  this.ionViewDidLoad()
                })
                .catch((e) => console.log(e));
              }
            }
          }
        }
      ]
    });
    prompt.present();
  }
}
