import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from './model/section.interface';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private URL = `${environment.baseUrl}/api/sections`;

  constructor(private http: HttpClient) { }

  getAllSections(): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.URL}`);
  }
}
