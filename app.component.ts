import { Component, OnInit, HostListener } from '@angular/core';
import { UserQuery, User } from "./Model/App.Model";
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name: string = 'Angular';
  info: boolean = false;
  displayUsersList: boolean = false;
  public users: User[];

  UserQuery: UserQuery = {
    queryParams: {
      QueryString: '',
      MaximumEntitySuggestions: 10,
      AllowEmailAddresses: true,
      AllowOnlyEmailAddresses: false,
      PrincipalSource: 15,
      PrincipalType: 1,
      SharePointGroupID: 0
    }
  };


  constructor(
    private _appService: AppService,
    private _http: HttpClient
  ) { }

  ngOnInit() {
    this.users = [];
  }

  selectedUser(res): void {
    console.log(res);
    this.name = res.DisplayText;
    this.displayUsersList = false;
  }


  onChange(res): void {
    res.preventDefault();
    if (this.name.length >= 3) {
      this.UserQuery.queryParams.QueryString = "";
      this.info = false;
      this.UserQuery.queryParams.QueryString = this.name;
      this.getUser();
    }
    else {
      this.info = true;
    }
  }

  getUser(): void {
    this._appService.getUserResponse(this.UserQuery)
      .subscribe(
        (res) => {
          this.users = [];
          const allUsers: User[] = JSON.parse(res.d.ClientPeoplePickerSearchUser);
          allUsers.forEach(user => {
            this.users = [...this.users, user];
          });
          this.displayUsersList = true;
          console.log(this.users);
        },
        (error) => {
          console.log(error);
        });
  }
}
