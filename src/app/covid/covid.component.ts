import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CovidServiceService } from '../service/covid-service.service';
import { Covid } from '../model/covid';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class CovidComponent implements OnInit {
  public currentUser
  chart : any
  options : any
  case : Covid
  covid : Covid[]
  cols : any[]

  kota : string
  positif : number
  meninggal : number
  sembuh :number
  odp : number
  pdp : number

  selectedCase : Covid
  displayDialog : boolean
  idToDelete : number
  newCase : boolean

  constructor(private service : CovidServiceService) {    
    service.getCovids().subscribe(
      result => this.covid = result,
      err => console.log("Error found! " + JSON.stringify(err)),
      () => console.log("Done!")      
    )
    this.chart = {
      labels: ['Positive', 'Deaths', 'Cured', 'ODP', 'PDP'],
      datasets : [
        {
          data : [this.positif, this.meninggal, this.sembuh, this.odp, this.pdp],
          backgroundColor: [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB"
          ]
        }
      ]
    }
  }

  ngOnInit(): void {
    this.service.getCovids()

    this.cols = [
      {field: 'idCase', header:'ID'},
      {field: 'kota', header:'City'},
      {field: 'positif', header:'Positive'},
      {field: 'meninggal', header:'Deaths'},
      {field: 'sembuh', header:'Cured'},
      {field: 'odp', header:'ODP'},
      {field: 'pdp', header:'PDP'}
    ]
  }

  showDialogToAdd() {
    this.newCase = true
    this.case = {
      'idCase': 0,
      'kota' : '' ,
      'positif' : 0,
      'meninggal' : 0, 
      'sembuh' : 0,
      'odp' : 0,
      'pdp' : 0
    }
    this.displayDialog = true
  }
  
  onRowSelect(event) {
    this.newCase = false
    this.chart = {
      labels: ['Positive', 'Deaths', 'Cured', 'ODP', 'PDP'],
      datasets : [
        {
          data : [this.positif = this.cloneCase(event.data).positif,
            this.meninggal = this.cloneCase(event.data).meninggal,
            this.sembuh = this.cloneCase(event.data).sembuh,
            this.odp = this.cloneCase(event.data).odp,
            this.pdp = this.cloneCase(event.data).pdp],
            backgroundColor: [
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#36A2EB"
            ]
        }
      ]
    }
    this.case = this.cloneCase(event.data)
    this.kota = this.cloneCase(event.data).kota
  }

  cloneCase(c : Covid): Covid {
    let cases = {}
    for(let prop in c){
      cases[prop] = c[prop]
    }
    return c
  }
}
