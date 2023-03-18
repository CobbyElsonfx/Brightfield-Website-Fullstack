# Brightfield-Website-Fullstack
## My sincere gratitude goes out to Mr. Oliver (DevRel at @digitalocean), who motivated me to do this project in order to demonstrate my expertise in full-stack web development.

<ins>### Project Link : https://btnfullstackweb.onrender.com  <ins>


<ins>#INTEGRATED STACKS</ins>
* HTML
* CSS
* JAVASCRIPT
* JQUERY 
* BOOTSTRAP
* HANDLEBARS TEMPLATING
* NODE AND EXPRESS.JS
* MVC
* MONGODB




### How I created the blog section using NEWSAPI 
To create a news API in Node, you can follow the steps outlined below:

Set up your project environment: Create a new folder for your project and initialize a new Node project using npm init in the terminal. Install the required dependencies like express, axios, and dotenv by running npm install express axios dotenv.

Obtain an API key: To fetch the news data, you will need to use a news API. Register for an API key from any news provider of your choice, such as NewsAPI or The Guardian.

Create a .env file: In the root directory of your project, create a new file named .env. Inside the .env file, add your API key as API_KEY=your_api_key_here.

Set up your server: Create a new file named server.js and add the following code:

```

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.get('/news', async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    res.json(response.data.articles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


```

In the above code, we have imported the required packages, initialized our express app, and set the port. We have also created a route for fetching news data from the news API using the axios package. The API key is obtained from the .env file, and the data is returned as JSON.
Start your server: In the terminal, run node server.js to start your server.

Test your API: Open your browser or any API testing tool like Postman and navigate to http://localhost:3000/news to see the news data.

That's it! You have now created a news API in Node. You can further customize this API to suit your needs, such as adding additional routes, filters, or pagination.
