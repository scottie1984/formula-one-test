## Setup

Get an API key for api sports  

### `npm install`

## API_KEY

API key for api sports must be added to process environment variables. I have detailed below how to start the project with the key. If you do not have a key to test please reach out to me on scottie1984@gmail.com and I can provide one.

## Available Scripts

In the project directory, you can run:

### `API_KEY=xxxx npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm test`

## Notes:

It took me 1 hour to get the API integration to work as I ended up hitting issues with subscriptions as there are 2 routes to signing up and I selected the wrong one initially. I then hit issues with CORS that I resolved by setting up a proxy. I also hit rate limiting issues with the API which also slowed down progress. This is a lot longer than I would have hoped and meant I had less time to complete some items I would have liked to do:

* Use react-table to get out of the box sorting and filtering
* the api response was already sorted as per the brief - I therefore didn't sort again - although given time I would have
* Error handling
* Find an actual toggle component rather than a button
* Align the design more with the Figma
* Move the inline styles into the CSS files
* Add types
* set up a proper node serve for the proxy rather than relying on create-react-app
* add transition states for loading

