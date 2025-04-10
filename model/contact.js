const mongoose = require('mongoose');

// Counter schema to track the sequence
const counterSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    seq: {
        type: Number,
        default: 0,
    },
});

const Counter = mongoose.model('Counter', counterSchema);

const contactSchema = new mongoose.Schema({
    _id: {
        type: Number, // Override the default ObjectId with a sequential integer
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { 
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id; // Rename _id to id
            delete ret._id;   // Remove _id
            delete ret.__v;   // Remove __v
        }
    },
    toObject: {
        transform: function (doc, ret) {
            ret.id = ret._id; // Rename _id to id
            delete ret._id;   // Remove _id
            delete ret.__v;   // Remove __v
        }
    }
});

// Pre-save middleware to auto-increment the `_id` field
contactSchema.pre('save', async function (next) {
    if (!this.isNew) return next();

    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'contactId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true } // Create the counter if it doesn't exist
        );
        this._id = counter.seq; // Assign the sequential integer to `_id`
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Contact', contactSchema);