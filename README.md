# assessment

## To run:

- Run `yarn` to install all dependencies
- Modify the parameters in `connection.ts` to access the database which has been pre configured
- Run `yarn start:dev` to start the app
- Send a get request to the URL `http://localhost:3333/discovery?lat=50&long=2&limit=2&type=cafe` to test the application

## Improvements

- Current query calculates distance for every row in the table and sorts whole table before returning. This won't
  scale well for thousands of businesses. To mitigate we could: - Split map up into set of bounding boxes - Associate businesses with these boxes - Only run distance calculation on businesses from the box that the provided point is in and adjacent boxes

- Tests could be added for middleware and router
- Query could be stored in database as a stored procedure
