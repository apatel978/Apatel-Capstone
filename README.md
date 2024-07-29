# Fitness Application (name TBD)

This app is used for creating and monitoring your fitness goals. It allows users to create goals, workouts, and even choose meals to tailor their own diet to help them achieve a better lifestyle. The backend of this app is built on Node, Express, and Javascript using a PostgreSQL database. Frontend rendering is handled with React and Redux.

## Features & Implementation

#### React router and components

This app is a single-page app. The React router handles the logic associated with component navigation and updates accordingly to the root route. The child components are done through React.

#### Frontend and Backend Interaction

This app is currently limited to posting data and modification of the database. The frontend stores retrieves and stores necessary information for rendering the site upon entry. There are seed data in the database which can be retrieved and modified, and new information can be passed to be stored into the database as well. The current application is limited to CRUD of goals and workouts.

#### Authentication

Users of the site are required to sign up if they would like to create goals and workouts. Users can see their own goals and workouts. Upon account creation, the user passwords are hashed with BCrypt before being stored. Authentication uses Bcrypt to match passwords which allow a user to login if the passwords match.

#### Goal Management

Users can create, read, update and delete goals. Any user can create goals, and each user can only see their own goals. Each goal will have a status of complete or incomplete that users can alter.

#### Workout Management

Users can create, read, update and delete workouts. Any user can create workouts. and each user can see only their own workouts. Each workout will have a type associated with it for ease of perusal.

#### Meal Management (not yet implemented)

Users will be able to create, read, update and delete meals. Any user can create a meal, which will then be posted to their saved meals as well as all means. Users can access all meals and save them to their 'Saved Meals' list. Users will be able to delete any meal from their 'Saved Meals' list. Only the original creator of a meal can delete their meal from the overarching app, however.

#### Meal Review Management (not yet implemented)

Users will be able to create, read, update, and delete meal reviews. Each meal in the all meals list will have an associated rating and reviews. The creator of the meal can not post a review on the meal, though they are able to read reviews on those meals. Users who are not the owner of a meal will be able to create and read reviews, while only being able to update and delete reviews that they have created.
