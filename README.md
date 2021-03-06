# Tweeter Project

Tweeter is a simple, single-page Twitter clone. Its lots of fun, clone it and run it to find out what it is all about!

## Features

1. Users are able to create a tweet and submit to an AJAX Post request, the list of tweets will re-render in real time.

2. Application is responsive for small,medium, and large sized screens.

3. There are Error messages that appear if the user violates the maximum allowed characters, or doesn't input anything on the new tweet form.

4. Once the user has scrolled down the navigation bar will disapper, and a button will appear in the bottom right of the page which will allow the user to go back to the top.

5. On a successful Tweet the new tweet form will slide down, and only reappear once the user clicks "Write a new Tweet".

## Screenshots

### 1. The mobile view

!["The Mobile View"](https://github.com/mrfinesse47/Tweeter/blob/main/docs/1.png?raw=true)

### 2. An error message displayed to the user for going over the allowed 140 characters.

!["An error message"](https://github.com/mrfinesse47/Tweeter/blob/main/docs/3.png?raw=true)

### 3. The button is displayed which allows you to auto-scroll back to the top. The navigation bar is now hidden.

!["User has scrolled down the page"](https://github.com/mrfinesse47/Tweeter/blob/main/docs/5.png?raw=true)

## Things to Note

-This project was mainly meant to be an exercise in using the jQuery library and other front end technologies, and as such there are a few back end features left out, such as user log in.


## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
4. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
5. Go to <http://localhost:8080/> in your browser.

## Dependencies

   - body-parser: ^1.15.2,
   - chance: ^1.0.2,
   - express: ^4.13.4,
   - md5: ^2.1.0
