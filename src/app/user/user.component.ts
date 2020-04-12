import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { User } from '../model/user';
import { TableModule } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api/public_api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  selectedUser : User
  displayDialog : boolean
  users : User[]
  cols : any[]
  user : User
  userCheck : User
  idToDelete : number
  loading: boolean=true
  first: number = 0
  rows: number = 10
  userEdit: {[s: string]: User;} = {}
  newUser : boolean

  constructor(private service : UserServiceService) { 
    service.getUser().subscribe(
      result => this.users = result,
      err => console.log("Ada error nich : " + JSON.stringify(err)),
      () => console.log("done!")
  )
   }

  ngOnInit(): void {
    this.service.getUser()

    this.cols = [
      {field: 'idUser', header:'ID'},
      {field: 'nama', header:'Nama'},
      {field: 'uname', header:'Username'},
      {field: 'pwd', header:'Password'}
    ]
  }

  showDialogToAdd() {
    this.newUser = true
    this.user = {
      'idUser': 0,
      'nama' : '' ,
      'posisi' : '',
      'pwd' : '', 
      'uname' : ''
    }
    this.displayDialog = true
  }

  onRowSelect(event) {
    this.newUser = false
    this.user = this.cloneUser(event.data)
    this.displayDialog = true
  }

  cloneUser(u : User): User {
    let user = {}
    for(let prop in u){
      user[prop] = u[prop]
    }
    return u
  }

  update() {
    let users = [...this.users];
    users[this.users.indexOf(this.selectedUser)] = this.user;
    this.service.updateUser(this.user).subscribe((res:any) => this.user = res)
    this.users = users;
    this.user = null;
    this.displayDialog = false;
    
  }

  delete(){
    let idToDelete = this.selectedUser.idUser
    let index = this.users.indexOf(this.selectedUser)
    this.service.deleteUser(idToDelete).subscribe(result => this.user = result)
    this.users = this.users.filter((val, i) => i != index)
    this.user = null
    this.displayDialog = false
  }
}
