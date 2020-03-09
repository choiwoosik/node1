const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

module.exports = () => {
    var db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
    });
          
    mongoose.connect(process.env.DB_SERVER_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    
  require('./models/config.js');
};
