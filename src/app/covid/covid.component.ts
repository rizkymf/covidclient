import { Component, OnInit } from '@angular/core';
import { CovidServiceService } from '../service/covid-service.service';
import { Covid } from '../model/covid';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit {
  public currentUser
  chart : any
  options : any
  covid : Covid[]
  cols : any[]
  
  kota = []
  positif = []
  meninggal = []

  constructor(private service : CovidServiceService) {
    this.currentUser = localStorage.getItem('currentUser')?
        JSON.parse(localStorage.getItem('currentUser')) : ''
    
    service.getCovids().subscribe(
      result => this.covid = result,
      err => console.log("Error found! " + JSON.stringify(err)),
      () => console.log("Done!")      
    )

    this.chart = {
      labels: this.kota,
      datasets: [
        {
          label: 'first',
          chart: this.covid
        }
      ]
    }
  }

  ngOnInit(): void {
    this.getCovids()

    this.cols = [
      {field: 'idCase', header:'ID'},
      {field: 'kota', header:'City'},
      {field: 'positif', header:'Positive'},
      {field: 'meninggal', header:'Deaths'}
    ]
  }

  getCovids(){
    this.service.getCovids().subscribe( dataCovid => {
        this.covid = dataCovid;
    })
  }

}
