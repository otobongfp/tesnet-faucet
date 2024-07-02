import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface IpInfo {
  ip: string;
  hostname?: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  postal?: string;
  timezone?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class getIPService {
  private apiUrl = 'https://ipinfo.io/json';

  constructor(private http: HttpClient) {}

  getIpInfo(): Observable<IpInfo> {
    return this.http.get<IpInfo>(this.apiUrl);
  }
}
