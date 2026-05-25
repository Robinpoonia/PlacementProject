const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  company: {
    type: String,
    required: true,
    trim: true
  },

  roundType: {
    type: String,
    enum: ['OT', 'Technical', 'HR'],
    required: true
  },

  description: {
    type: String,
    required: true
  },

  result: {
    type: String,
    enum: ['Qualified', 'Not Qualified'],
    required: true
  },

  nextRoundDetails: String,

  anonymous: {
    type: Boolean,
    default: true
  },

  helpfulCount: {
    type: Number,
    default: 0
  }

},
{
 timestamps: true
}
);

experienceSchema.index({
 company: 1,
 roundType: 1
});

module.exports =
mongoose.model(
'Experience',
experienceSchema
);