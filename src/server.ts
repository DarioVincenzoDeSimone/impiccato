import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example server-side rendering route using the Angular engine.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      if (response) {
        res.status(response.status);
        response.headers.forEach((value, key) => res.setHeader(key, value));
        response.text().then(text => res.send(text));
      } else {
        next();
      }
    })
    .catch(next);
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Standard `listen` rules...
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 3000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server) and Cloud Run.
 */
export const reqHandler = createNodeRequestHandler(app);
