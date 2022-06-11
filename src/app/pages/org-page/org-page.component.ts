import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-org',
  templateUrl: './org-page.component.html',
  styleUrls: ['./org-page.component.scss']
})
export class OrgPageComponent implements OnInit {

  count: number = 0
  isLoadProfile: boolean = false
  listMyOrg: boolean = false

  constructor() {

  }

  ngOnInit(): void {
  }

  firstTempl() {
    this.count=1
  }

  secondTempl() {
    this.count=2
  }

  thirdTempl() {
    this.count=3
    this.listMyOrg = true
  }
}
