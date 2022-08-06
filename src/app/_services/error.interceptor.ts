import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) return throwError(() => error.statusText);

        if (error instanceof HttpErrorResponse) {
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) return throwError(() => applicationError);
        }

        const serverError = error.error;
        console.log(serverError);
        let modelStateErrors = '';
        if (serverError.errors && typeof serverError.errors === 'object') {
          for (const key in serverError.errors) {
            if (serverError.errors[key]) {
              modelStateErrors += serverError.errors[key] + '\n';
            }
          }

          //for example : modelStateError accommodates for password and username error which mean multiple field error
          return throwError(() => modelStateErrors);
        }

        //another example serverError accommodates for User already exists server error response.
        if (typeof serverError === 'string')
          return throwError(() => serverError);

        // if you reach here then we don't know what type of error it is
        // in this case we add some text 'Server Error'
        return throwError(() => 'Server Error');
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
