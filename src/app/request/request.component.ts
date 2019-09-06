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
    // select function is used to get data from the store. First parameter is the name of the store
    // second parameter is part of the store
    this.processedRequests$ = this.store.pipe(select('crudRequests', 'requestCollection'));
    // Once you get results from store, you need to subscribe it to show it.
    this.processedRequests$.subscribe(req => {
      this.rt = req;
      console.log(this.rt);
    })
    .unsubscribe();
  }

  // This is just a function that dispatches an action. This will go in request.actions and find that action and dispatch it.
  // There are effects that are listening to the actions, if there is an effect with same action name then effect will start its work
  // Reducers are also with same name and will behave depending upon the results from actions/effects.
  // In this example, LoadStaticRequestsFromEffects action is dispatched which has an effect listening for this action
  // which calls a service to get results from service and then call another action "ShowAllRequestsFromEffects" and passes the results
  // from service as payload. This payload is used by the reducer to update the store.
  // Once the store is updated, processedRequest$ variable is updated by selecting requestCollection from crudRequests Store
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
