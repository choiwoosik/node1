const mongoose = require('mongoose');

module.exports = () => {
    var db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
    });
          
    mongoose.connect('mongodb://localhost/node1_db', {useNewUrlParser: true, useUnifiedTopology: true});
    
  require('./models/config.js');
};
