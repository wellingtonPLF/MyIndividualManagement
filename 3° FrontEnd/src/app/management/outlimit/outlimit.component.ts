import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outlimit',
  templateUrl: './outlimit.component.html',
  styleUrls: ['./outlimit.component.scss']
})
export class OutlimitComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
