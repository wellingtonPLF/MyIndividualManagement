import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { protocol } from 'src/environments/environment';

@Component({
  selector: 'app-access-user',
  templateUrl: './access-user.component.html',
  styleUrl: './access-user.component.scss'
})
export class AccessUserComponent {
  hostname!: string;
  localhost!: string;

  constructor(private router: Router, private localStorage: LocalStorageService) {
    this.localhost = `${window.location.protocol}//${window.location.host}/login`;
  }

  onLinkClick(event: MouseEvent): void {
    event.preventDefault();
    if (this.hostname) {
      if (this.hostname != '' && this.hostname.includes(protocol)) {
          const lastValue = this.hostname.charAt(this.hostname.length - 1)
          if (lastValue == "/") {
            this.hostname = this.hostname.slice(0, this.hostname.length - 1)
          }
          if (this.hostname.length > 40) {
            this.localStorage.setToken('backendHostname', this.hostname)
            window.location.href = this.localhost
          }
      }
    }
  }
}
