import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-arrow',
  templateUrl: './back-arrow.component.html',
  styleUrls: ['./back-arrow.component.scss']
})
export class BackArrowComponent implements OnInit {


  ngOnInit(): void {
  }

  goBack() {
    history.go(-1)
  }
}
