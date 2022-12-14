const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String },
   url: { type: String },
   description: { type: String },
   children: { type: mongoose.Schema.Types.Array , ref: 'Document' }
});

module.exports = mongoose.model('Document', documentSchema);