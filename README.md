# Journey Builder Custom Activity [![Build Status](https://travis-ci.org/berkandirim/sfmc.svg?branch=master)](https://travis-ci.org/berkandirim/sfmc)

This is a custom activity for creating web push notifications.

---

## To run this project locally

Make sure you have mongoDB installed
Instructions for installing 
[Mac](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
[Windows](https://treehouse.github.io/installation-guides/windows/mongo-windows.html)
[Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)

Start mongo
```
$ mongod
```

Switch to the sfmc folder and install dependencies
```
$ cd sfmc
$ npm install
```

If you have nodemon
```
$ nodemon
```

Else
```
$ npm run start
```

Then in the borwser navigate to http://localhost:3000
The form to create the web push notifications will appear. 

Here is a live demo
https://sfmc-push-notifications.herokuapp.com/

---

## How to use
Enter your Title (max. 25 char.), Description (max. 160 char.), select the countries that will receive this push notification, then enter the URL of the image or icon of you notification.

You can preview your notification by clicking the 'Preview' button on the top right of the page. The notification box will slide in. You can click the 'x' icon to close the box.

You can either clear the form to start over by clicking 'Clear Form' or save the output of this form in JSON format to DB. After saving to the DB, you will see the second step of the activity. An output of the form data.

`connection.trigger('nextStep')` and `connection.trigger('prevStep')` methods are available to switch between steps.

---

## Frameworks/Libraries/DB used
- [Chota](https://jenil.github.io/chota/) Minimal CSS framework. For quick styling.
- [Express](https://expressjs.com/) NodeJS web framework. For server side scripting and endpoints.
- [Postmonger](http://kevinparkerson.github.io/postmonger/) Events for SFMC Journey Builder.
- [MongoDB](https://www.mongodb.com/) Database. I chose mongoDB because of the nice compatibility with node and express and because it's one of the best noSQL databases out there.
- [Mongoose](http://mongoosejs.com/) mongoDB object modeling for NodeJS

---

## Deployment
Application is automatically deployed to Heroku when changes pushed to the master branch and passes the Travis CI build.