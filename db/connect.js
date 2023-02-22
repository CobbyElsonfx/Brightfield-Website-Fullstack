const mongoose = require("mongoose")


function dbConnect(mongourl){
    return mongoose.connect(mongourl, { 
    useNewUrlParser:true,
})

}   



module.exports = dbConnect