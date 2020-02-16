const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  issue: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  assignedTo: {
    type: String,
  },
  status: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  updatedOn: {
    type: Date,
    default: Date.now()
  },
  open: {
    type: Boolean,
    default: true
  }  
});

module.exports = mongoose.model('Issue', issueSchema);
