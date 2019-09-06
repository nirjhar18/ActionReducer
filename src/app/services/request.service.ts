import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Request } from '../models/request.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class RequestService {
  requestSaticList =  Request[2] = [
    { RequestId : '4', Name : 'Test4 Effects'},
    { RequestId : '5', Name : 'Test5 Effects'},
    { RequestId : '6', Name : 'Test6 Effects'}
  ];

    // Inject Angular http service
    constructor(private httpClient: HttpClient) { }

    // Notice the method return type is Observable<Request[]>
    getRequests(): Observable<Request[]> {
        // To convert Observable<Response> to Observable<Request[]>
        // we are using the map operator
        return this.httpClient.get('{exampleUrl}').pipe(
                    map((response: HttpResponse<Request[]>) => {
                      const responseData = response.body || response;
                      return responseData as Request[];
                    })
        );
    }

    getStaticRequests(): Observable<Request[]> {
      console.log(of(this.requestSaticList));
      return  of(this.requestSaticList);
  }
  }
