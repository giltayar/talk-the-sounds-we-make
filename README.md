# talk-the-sounds-we-make

The code used in the lightning talk "Èeèéêëēėę: the sounds we make with no E2E Tests and bugs in production"

## The Server

This server is a counter, which you can set, get, increment, and decrement.

The server code, in the `src` directory, is divided into two.

* [`app.js`](./src/app.js): creates the express app, and configures it. Exports the express app.
  This is the main code of the application
* [`server.js`](./src/server.js): imports `app.js` and listens on it. This is the module that needs to run.

I split this into two files, because it is easier to test only `app.js` by importing it, and using it to listen.
the alternative is to run the `server.js` as a process, which is not a nice thing.

You can look at [`app.js`](./src/app.js) to see what the rest endpoints are.
You can look at some [http request](./src/test-de-la-shamtee.http) for some example http requests.
