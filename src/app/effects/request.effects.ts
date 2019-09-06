import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { RequestService } from '../services/request.service';
import {
  UpdateRequest,
  LoadAllRequests,
  GetRequest,
  ShowAllRequestsFromEffects,
  LoadStaticRequestsFromEffects } from '../actions/request.actions';

@Injectable()
export class RequestEffects {
  // Pipe is a method on observable which is used for composing operators.
  // For example:
  //   of(1,2,3).map(x => x + 1).filter(x => x > 2);
  // and turn it into this
  // of(1,2,3).pipe(
  //   map(x => x + 1),
  //   filter(x => x > 2)
  // );
    loadServiceRequest$ = createEffect(() => this.actions$.pipe(
      ofType('[Request] LoadAllRequestsFromEffects'),
      mergeMap(() => this.requestService.getRequests().pipe(
        map(requests => ({ type: '[Request] ShowAllRequestsFromEffects', payload: requests })),
        catchError(() => EMPTY))
      )
    )
    );

    // Pipe is basically used to pass output of one function to the input of the next function.
    loadStaticRequest$ = createEffect(() => this.actions$.pipe(
      // OfType will look for actions$ of type you pass in parameters and once this action is dispatched
      // it will run this effect.
      ofType('[Request] LoadStaticRequestsFromEffects'),
      // Merge Map function is used to return multiple results. () is an anonymous function with no input parameters
      // It calls getStaticRequests() method and pipe is used to map observables results
      mergeMap(() => this.requestService.getStaticRequests().pipe(
        // map function is used to transform objects
        // If service was returning an object and you only needed part of the object, you could use map operator for that
        // For example: map((action : CancelPayments) => action.Payload)
        // In this example, requests is the result of getStaticRequests() and it is used in an anonymous function
        // to call next action with requests as payload
        map(requests  => (ShowAllRequestsFromEffects({requestsfromEffects: requests}))),
        catchError(() => EMPTY))
      )
      )
    );

  constructor(
    private actions$: Actions,
    private requestService: RequestService
  ) {}

}
