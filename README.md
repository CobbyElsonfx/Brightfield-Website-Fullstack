# Brightfield-Website-Fullstack
## My sincere gratitude goes out to Mr. Oliver (DevRel at @digitalocean), who motivated me to do this project in order to demonstrate my expertise in full-stack web development.

<ins>### Project Link : https://btnfullstackweb.onrender.com  <ins>


## Introduction

I developed the Brightfield Tech Academy Website to showcase my expertise in full-stack development and simplify the application process for learners interested in enrolling at Brightfield Tech Academy. The website allows learners to apply online without visiting the Brightfield Center in person. Additionally, it provides an admin panel to create posts and update learners on the latest happenings.
Tech Stack Overview

### The Brightfield Tech Academy Website utilizes the following tech stack:

    * Front-end: JavaScript, Handlebars templating, HTML, CSS, and Bootstrap.
    * Back-end: Node.js with Express.js framework.
    * Database: MongoDB for data storage.

## Architecture Overview

* The root directory of the project contains several directories and files, each serving a specific purpose:

    Controllers: Handles the logic of the website, determining which views to present to the user and managing user authentication.

    DB: Contains a function used in app.js to establish a connection to the MongoDB database using the connection string stored in the .env file.

    Middleware: Contains the requireAuth file, which includes functions to protect certain routes from unauthorized access.

    Models: Includes three files:
        Auth: Represents the model for user authentication.
        Blog: Represents the model for the website's newsfeed section, allowing the admin to create and delete posts.
        Forms: Represents the model for student admission forms.

    Public: Stores static files such as images, CSS, and client-side JavaScript.

    Routes: Defines various endpoints, including /, /users, /about, /contact, /learn, /programs, /mentorship, /newsfeed, /user/signup, /user/login, /user/logout, and more. Each route corresponds to a specific functionality of the website and communicates with the controllers.

    Views: Contains the views for different sections of the website, such as home, about, blog, and more. Handlebars templating is used to generate dynamic content and render the views.

    Other files: The root directory also includes files such as .env (containing environmental variables like connection string, port, API keys, and JWT secret), app.js (the entry point of the website, handling server creation, endpoint registration, and database connections), package-lock.json, package.json, README, and .gitignore.

## Data Flow and Interaction

When a user interacts with the Brightfield Tech Academy Website, the data flow follows these steps:

    User requests are handled by specific endpoints defined in app.js.
    These endpoints correspond to routes defined in the routes directory.
    The routes communicate with the controllers, which contain the necessary logic to process the user's request and determine the appropriate view to present.
    The controllers interact with the models to perform actions such as user authentication, post creation/deletion, or student admission form handling.
    The controllers then render the appropriate view from the views directory, generating dynamic content using Handlebars templating.
    The rendered view is sent back as a response to the user.

### Key Functionalities and Integrations

The Brightfield Tech Academy Website includes several key functionalities and integrations:

    Newsfeed Section: The website displays current news using the News API. The Axios library is used to fetch news data, which is then displayed in the UI. Handlebars helpers are utilized to loop through the data and present it to users.

    Email Functionality: Users can apply for admission and receive confirmation emails. This functionality is integrated using SendGrid, a cloud-based SMTP provider that eliminates the need for maintaining an email server.

    User Authentication: JWT (JSON Web Token) is employed for user authentication. Upon successful login, a token is generated and stored in the user's local storage as a cookie. This token is used for future authorization. User passwords are securely hashed using the bcrypt library in JavaScript.

Lessons Learned and Future Considerations

During the development of the Brightfield Tech Academy Website, I gained valuable insights and knowledge, including:

    Improved organization and naming conventions for enhanced project presentation and readability.
    Implementation of JWT for user authentication.
    Integration of external APIs like the News API and SendGrid for extended functionality.

In the future, I plan to enhance the website's capabilities by implementing features such as course uploads, assignments, the admin's ability to create posts, and a discussion forum for learners.

By building the Brightfield Tech Academy Website, I not only demonstrated my full-stack development skills but also developed a platform that simplifies the admission process and keeps learners informed about Brightfield Tech Academy.
