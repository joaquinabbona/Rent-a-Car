import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch';
import { map } from 'rxjs/operators';

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

  getBranchById(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.url}/${id}`);
  }
  getBranchByName(name: string): Observable<Branch> {
    return this.http.get<Branch[]>(`${this.url}?city=${name}`).pipe(
      map(branches => {
        if (branches.length > 0) {
          return branches[0]; // Returns the first branch with matching name
        }
        throw new Error(`Branch with name ${name} not found`);
      })
    );
  }
  
}
