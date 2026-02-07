const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    roundType: {
      type: String,
      required: true,
      enum: ['OT', 'Technical', 'HR'],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    result: {
      type: String,
      required: true,
      enum: ['Qualified', 'Not Qualified'],
    },
    nextRoundDetails: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

experienceSchema.index({ company: 1, roundType: 1 });

module.exports = mongoose.model('Experience', experienceSchema);
