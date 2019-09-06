import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Request } from '../models/request.model';
import { RequestState } from '../reducers/request.reducer';
import { Observable } from 'rxjs';
import { UpdateRequest , LoadAllRequests, GetRequest, LoadStaticRequestsFromEffects } from '../actions/request.actions';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})

export class RequestComponent implements OnInit {
  request$: Observable<RequestState>;
  processedRequests$: Observable<Array<Request>>;
  firstRequest$: Observable<Request>;
  requestList =  Request[2] = [
    { RequestId : '1', Name : 'Test1'},
    { RequestId : '2', Name : 'Test2'},
    { RequestId : '3', Name : 'Test3'}
  ];
   rt: Array<Request>;
   firstRequest: Request;

  constructor(private store: Store<{ request: RequestState }>) {
    this.request$ = store.pipe(select('request'));
  }

  ngOnInit() {

  }

  UpdateRequest() {
    // This is an example. I am passing the first element of a pre-defined array inside update request action.
    this.store.dispatch(UpdateRequest({request : this.requestList[0]}));
  }

  LoadRequests() {
    // Load All requests is an action that takes the payload of allRequests as a type of Request Array.
    this.store.dispatch(LoadAllRequests({allRequests: this.requestList}));
    // Subscribe the observable to get records from the store and assign to gloabl object.
    this.processedRequests$ = this.store.pipe(select('crudRequests', 'requestCollection'));
    this.processedRequests$.subscribe(req => {
      this.rt = req;
      console.log(this.rt);
    })
    .unsubscribe();
  }

  LoadRequestsFromEffects() {
    this.store.dispatch(LoadStaticRequestsFromEffects());
    this.processedRequests$ = this.store.pipe(select('crudRequests', 'requestCollection'));
    this.processedRequests$.subscribe(req => {
      this.rt = req;
      console.log(this.rt);
    });
  }
  GetRequest() {
    this.store.dispatch(GetRequest({requestID : this.requestList[0].RequestId}));
    this.firstRequest$ = this.store.pipe(select('crudRequests', 'request'));
    this.firstRequest$.subscribe(req => {
      this.firstRequest = req;
      console.log(this.firstRequest);
    });
  }
}
