import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private url= 'http://localhost:3000/branches';
  
  constructor(private http : HttpClient) { }


  getBranches(): Observable<Branch[]>{
    return this.http.get<Branch[]>(this.url)
  }

  addBranch(branch:Branch): Observable<Branch>{
    return this.http.post<Branch>(this.url,branch)
  }

  deleteBranch(id:string): Observable<Branch>{
    return this.http.delete<Branch>(this.url+'/'+id)
  }


}
