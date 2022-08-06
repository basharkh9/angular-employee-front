import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          console.log(
            'the interceptor has caught an error, process it here',
            err
          );
          if (err.status === 401) return throwError(() => err.statusText);
          if (err instanceof HttpErrorResponse) {
            const applicationError = err.headers.get('Application-Error');
            if (applicationError) return throwError(() => applicationError);

            const serverError = err.error;

            let modelStateErrors = '';
            if (serverError.errors && typeof serverError.errors === 'object') {
              for (const key in serverError.errors) {
                if (serverError.errors[key]) {
                  modelStateErrors += serverError.errors[key] + '\n';
                }
              }
            }
            //for example : modelStateError accommodates for password and username error
            //another example serverError accommodates for User already exists server error response.
            return throwError(() => modelStateErrors || serverError);
          }
          // if you reach here then we don't know what type of error it is
          // in this case we add some text 'Server Error'
          return throwError(() => 'Server Error');
        },
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
