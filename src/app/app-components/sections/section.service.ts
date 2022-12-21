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

  addNewSection(section: Section): Observable<Section> {
    return this.http.post<Section>(this.URL, section);
  }

  updateSection(section: Section): Observable<Section> {
    return this.http.put<Section>(this.URL, section);
  }

  deleteSection(sectionId: number): Observable<Section> {
    return this.http.delete<Section>(`${this.URL}/${sectionId}`);
  }
}
