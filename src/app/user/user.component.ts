import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { User } from '../model/user';
import { TableModule } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api/public_api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users : User[]
  cols : any[]
  user : User
  userCheck : User
  idToDelete : number
  loading: boolean=true
  first: number = 0
  rows: number = 10
  userEdit: {[s: string]: User;} = {}

  constructor(private service : UserServiceService) { 
    service.getUser().subscribe(
      result => this.users = result,
      err => console.log("Ada error nich : " + JSON.stringify(err)),
      () => console.log("done!")
  )
   }

  ngOnInit(): void {
    this.getUsers()

    this.cols = [
      {field: 'idUser', header:'ID'},
      {field: 'nama', header:'Nama'},
      {field: 'uname', header:'Username'},
      {field: 'pwd', header:'Password'}
    ]
  }

  getUsers(){
    this.service.getUser().subscribe( dataUser => {
        this.users = dataUser;
    })
}

checkUser(uname: string, pwd: string){
    this.service.checkUser().subscribe( check => {
        this.userCheck = check;
    })
}

deleteUser(){
    this.service.deleteUser(this.idToDelete).subscribe(data => {
        this.getUsers();
    })
}
  reset(){
    this.first=0
  }

  paginate(event){
  }

  next(){
    this.first = this.first + this.rows
  }

  prev(){
    this.first = this.first - this.rows
  }

  isFirstPage(): boolean{
    return this.first === 0;
  }

  isLastPage(): boolean{
    return this.first === (this.users.length - this.rows)
  }

  loadUsersLazy(event : LazyLoadEvent){
    this.loading = true
    setTimeout(() => {
      if(this.users.slice(event.first, (event.first + event.rows)))
      this.loading = false;
    })
  }

  onRowEditInit(user: User){
    this.userEdit[user.idUser] = {...user}
  }

  onRowEditSave(user: User){
    delete this.userEdit[user.idUser]
  }

}
