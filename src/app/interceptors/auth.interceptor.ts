import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

/**
 * Adjunta el JWT (access token) a toda petición saliente, si existe.
 * Con esto, TareaService (o cualquier servicio que llame a /api/...) no
 * necesita preocuparse por el header Authorization en cada llamada.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const token = authService.getAccessToken();

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(authReq);
};
