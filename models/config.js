const mongoose = require('mongoose');
const configSchema = new mongoose.Schema({
  ProductID: String,
  ProductName: String
});
module.exports = mongoose.model('Config', configSchema);