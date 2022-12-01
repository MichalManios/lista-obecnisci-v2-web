import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FunctionDTO } from './model/function-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  private URL = `${environment.baseUrl}/api/functions`;

  constructor(private http: HttpClient) { }

  getAllFunctions(): Observable<FunctionDTO[]> {
    return this.http.get<FunctionDTO[]>(`${this.URL}`);
  }
}
