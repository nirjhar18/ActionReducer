import {
  UpdateRequest,
  LoadAllRequests,
  GetRequest,
  ShowAllRequestsFromEffects,
  LoadStaticRequestsFromEffects } from '../actions/request.actions';
import { Request, RequestInitial } from '../models/request.model';
import {createReducer, on} from '@ngrx/store';



// Reducers are used to create/initialize and update store.
// New Interface for Request State.
export interface RequestState {
    requestCollection: Request[];
    request: Request;
    requestId: Request['RequestId'];
}

// Initialize Store State with Request Initial Const and empty values.
export const requestInitialState: RequestState = {
    requestCollection: [],
    request: RequestInitial,
    requestId: '0'
};

// Create a reducer function with createReducer function and use "on" method for each action in action.ts
// requestReducer will be used in app.module.ts to add it to pipeline. Name of the store will be in app.module.ts
export const requestReducer = createReducer(
  requestInitialState,
  on(UpdateRequest, state => ({
      ...state,
      request : state.request,
  })),
  // allrequests below is the payload that is used to update the store.
  on(LoadAllRequests, (state , { allRequests }) => ({
    ...state,
    requestCollection : allRequests,
  })),
  on(GetRequest, (state, {requestID}) => ({
    ...state,
    request : state.requestCollection.filter(x => x.RequestId === requestID)[0],
  })),
  on(LoadStaticRequestsFromEffects, state => ({
    ...state
  })),
  // requestsFromEffects is the payload that is coming from effect results which is used to update the requestion collection in the store.
  on(ShowAllRequestsFromEffects, (state , { requestsfromEffects }) => ({
    ...state,
    requestCollection : requestsfromEffects,
  }))
);
