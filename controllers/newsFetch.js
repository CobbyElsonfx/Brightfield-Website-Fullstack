require("dotenv").config()
var  axios = require("axios")



const apiKey = process.env.NEWS_API_KEY 


fetchNews = async(req,res)=>{
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=technology&apiKey=${apiKey}`)
        const newsData = response.data.articles
        res.render("newsfeed" , {newsData})
        console.log(newsData)

        
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
        
    }
}




module.exports = {
    fetchNews
}