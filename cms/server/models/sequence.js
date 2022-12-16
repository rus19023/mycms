const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   value: { type: Number, required: true },
   type: { type: String, required: true },
});

module.exports = mongoose.model('Sequence', sequenceSchema);