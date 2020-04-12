import { Component, OnInit } from '@angular/core';
import { Covid } from '../model/covid';
import { CovidServiceService } from '../service/covid-service.service';

@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.component.html',
  styleUrls: ['./edit-case.component.css']
})
export class EditCaseComponent implements OnInit {

  case : Covid
  covid : Covid[]
  cols : any[]
  
  kota = []
  positif = []
  meninggal = []
  sembuh = []
  odp = []
  pdp = []

  selectedCase : Covid
  displayDialog : boolean
  idToDelete : number
  newCase : boolean
  caseEdit: {[s: string]: Covid;} = {}

  constructor(private service : CovidServiceService) {    
    service.getCovids().subscribe(
      result => this.covid = result,
      err => console.log("Error found! " + JSON.stringify(err)),
      () => console.log("Done!")      
    )
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
    this.case = this.cloneCase(event.data)
    this.displayDialog = true
  }

  cloneCase(c : Covid): Covid {
    let cases = {}
    for(let prop in c){
      cases[prop] = c[prop]
    }
    return c
  }

  update() {
    let cases = [...this.covid];
    cases[this.covid.indexOf(this.selectedCase)] = this.case;
    this.service.updateCovids(this.case).subscribe((res:any) => this.case = res)
    this.covid = cases;
    this.case = null;
    this.displayDialog = false;
    
  }

  delete(){
    let idToDelete = this.selectedCase.idCase
    let index = this.covid.indexOf(this.selectedCase)
    this.service.deleteCovid(idToDelete).subscribe(result => this.case = result)
    this.covid = this.covid.filter((val, i) => i != index)
    this.case = null
    this.displayDialog = false
  }

}
