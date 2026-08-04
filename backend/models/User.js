const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    googleId: {
        type: String,
        unique: true,
        sparse: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    scholarNo: {
        type: String,
        required: true,
        unique: true
    },

    role: {
        type: String,
        enum: [
            "admin",
            "boss",
            "senior",
            "junior",
            "alumni"
        ],
        required: true
    },

    phone: {
  type: String,
  trim: true,
  default: "",
},
    profilePicture: {
        type: String,
        default: ""
    },


    resumeUrl: {
        type: String,
        default: ""
    },
    batch: {
        type: Number,
        required: true,
    },
    selectedCompany: {
  type: String,
  trim: true,
  default: "",
},

package: {
  type: Number,
  min: 0,
  default: null,
},
    isActive: {
        type: Boolean,
        default: true
    }
    

},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);