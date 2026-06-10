import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../Shared/services/loader.service';
import { delay, finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loadService =  inject(LoaderService) ;
  loadService.show();

  return next(req).pipe(
    delay(1500) ,
    finalize(() => loadService.hide())
  );
};
