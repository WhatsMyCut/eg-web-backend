This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Earth Guardians Stack
### Quick Note:
One of the needs for this app is detailed analytics. I am going to recommend google analytics and connecting it to the native app via expo-analytics. This is the best solution. If they don’t have a google analytics account they can create one quickly and inexpensively. 

i.e.
How many viewers seen a page, google analytics will have the data. 
How many times has a action been taken, db and google analytics will have the data.


## Backend:

Prisma.io - The de facto graphql backend as a service. Runs on sql + graphql
Graphql-Yoga Midserver - This is the defacto node+express graphql connector
Vimeo for Video Storage (upload to vimeo and add the url in the web app)
Expo Push notification sdk for sending push notifications


## Native App:

React Native
Expo - Preview react native apps over the web or via QR code
AsyncStorage - For saving user data locally
Amazon s3
Google Analytics (through expo analytics package)


## Web App:

Netlify
React
Semantic UI
Apollo-graphql




## Backend Setup:

The web application and the backend are in the same repository, with the backend being a subrepository. I have deployed the web app to netlify for the time being, but it can be deployed anywhere that supports react hosting/static hosting (netlify, even github, aws cloud front). The backend is it’s own repository tied directly to heroku. To deploy, you need to push to the heroku git url.


URL for production mid server: https://eg-production.herokuapp.com/

Heroku git url for pushing updates to the server:
(add these to the /backend directory using `git remote add production https://git.heroku.com/eg-production.git`)
```
production: https://git.heroku.com/eg-production.git (fetch)
production: https://git.heroku.com/eg-production.git (push)
```

Backend Environment Keys (keep in root backend directory with .env as filename):
`PRISMA_ENDPOINT="https://eg-production-879cf73477.herokuapp.com/"`
`APP_SECRET=inthegardenofeden`
`PRISMA_MANAGEMENT_API_SECRET = 415026483855dddc325e370b6bc18e1dbbb999f3`


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
