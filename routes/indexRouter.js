import { Router } from 'express';
const router = Router();

router.get('/api/v1/signin', (req, res, next) => {
  res.json({
    "message": "Hello world",
  })
});

export default router;
