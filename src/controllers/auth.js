import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as authService from '../services/authService';
import { defaultThrottleConfig } from 'rxjs/operator/throttle';

const router = Router();

router.post('/', (req, res, next) => {
  authService
    .login(req.body.name, req.body.password)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

router.post('/token', (req, res, next) => {
  authService
    .refreshToken(req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
