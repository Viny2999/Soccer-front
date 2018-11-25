import { Component, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../services/http.service";
import { Time } from '../../time';

@Component({
  selector: 'page-times',
  templateUrl: 'times.html'
})
export class TimesPage {
  time : Time[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject(HttpService) public httpService: HttpService) {
  }

  ionViewDidLoad() {
    this.httpService.getAllTimes('/time/all').then(time => this.time = time);
    console.log(this.time[0]);
  }

}
