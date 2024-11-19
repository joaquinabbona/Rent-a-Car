import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch';
@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = 'http://localhost:3000/branches'; 

  constructor(private http: HttpClient) {}

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiUrl);
  }

  addBranch(branch: Branch): Observable<Branch> {
    return this.http.post<Branch>(this.apiUrl, branch);
  }

  deleteBranch(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;  
    return this.http.delete<void>(url);
  }
}