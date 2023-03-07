import express from 'express';

const logger = (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(`${fullUrl} was visited!!!`);
  next();
};

export default logger;
