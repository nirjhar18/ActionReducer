import {createAction, props} from '@ngrx/store';
import { Request } from '../models/request.model';

// create action method is used to create actions which can be used by effects and reducers.
// props is a way in NgRx 8/Angular 8 to pass payload to the action
export const UpdateRequest = createAction(
  '[Request] UpdateRequest',
  props<{request: Request}>()
);
export const LoadAllRequests = createAction(
    '[Request] LoadAllRequests',
    props<{allRequests: Request[]}>()
);
export const GetRequest = createAction(
    '[Request] GetRequest',
    props<{requestID: Request['RequestId']}>()
);
export const LoadAllRequestsFromEffects = createAction(
  '[Request] LoadAllRequestsFromEffects'
);
export const LoadStaticRequestsFromEffects = createAction(
  '[Request] LoadStaticRequestsFromEffects'
);
export const ShowAllRequestsFromEffects = createAction(
  '[Request] ShowAllRequestsFromEffects',
  props<{requestsfromEffects: Request[]}>()
);
export const loadRequestFailure = createAction(
  '[Request] ErrorRequest',
  props<{error: any}>()
);
