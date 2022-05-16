import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }



}
