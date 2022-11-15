import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WorkerFlattened } from './models/worker-flattened.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  private URL = `${environment.baseUrl}/api/workers`;

  constructor(private http: HttpClient) { }

  getAllWorkersBySectionName(sectionName: string): Observable<WorkerFlattened[]> {
    return this.http.get<WorkerFlattened[]>(`${this.URL}/${sectionName}`);
  }
}
