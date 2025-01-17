# assessment

## Instructions to Run

- Run `yarn set version self` to use correct version of yarn
- Run `yarn` to install all dependencies
- Modify the parameters in `connection.ts` to access the database which you have pre-configured 
- Run `yarn start:dev` to start the app
- Send a get request to the URL `http://localhost:3333/discovery?lat=50&long=2&limit=2&type=cafe` to test the application
- To run the unit tests run `yarn test`

## TODO

- Current query calculates distance for every row in the table and sorts whole table before returning. This won't
  scale well for thousands of businesses. To mitigate this we could: 
  - Split map up into set of bounding boxes 
  - Associate businesses with these boxes 
  - Only run distance calculation on businesses from the box that the provided point is in and adjacent boxes

- Add tests for middleware and router
- Store query as a stored procedure
- Implement a proper validator library like [validator.js](https://www.npmjs.com/package/validator)
- Add scripts to create optimised production build
