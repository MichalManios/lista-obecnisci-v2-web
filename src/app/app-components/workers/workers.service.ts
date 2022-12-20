import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WorkerFlattened } from './models/worker-flattened.interface';
import { environment } from '../../../environments/environment';
import {WorkerDTO} from "./models/worker-dto.interface";

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  private URL = `${environment.baseUrl}/api/workers`;

  constructor(private http: HttpClient) { }

  getAllWorkersBySectionName(sectionName: string): Observable<WorkerFlattened[]> {
    return this.http.get<WorkerFlattened[]>(`${this.URL}/${sectionName}`);
  }

  addNewWorker(worker: WorkerDTO): Observable<WorkerFlattened> {
    return this.http.post<WorkerFlattened>(this.URL, worker);
  }

  updateWorker(worker: WorkerDTO): Observable<WorkerFlattened> {
    return this.http.put<WorkerFlattened>(this.URL, worker);
  }

  deleteWorker(workerId: number): Observable<WorkerFlattened> {
    return this.http.delete<WorkerFlattened>(`${this.URL}/${workerId}`);
  }
}
