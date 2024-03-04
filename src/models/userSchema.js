const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => /^[a-zA-Z0-9_]{3,20}$/.test(value),
            message: 'Username is not valid',
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value),
            message: 'Email is not valid',
        },
    },
    contactNumber: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: value => /^[6789]\d{9}$/.test(value),
            message: 'Phone number is not correct',

        },
    },
    Gender: {
        type: String,
        require: true,
        unique: true,
        enum: ['MALE', 'FEMALE'],
    },
    StudentId: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: value => /^(21|22)[0-9]{5,6}$/.test(value),
            message: 'Student Id is not valid',
        },
    },
    residence: {
        type: String,
        enum: ['HOSTLER', 'DAYSCHOLAR'],
        default: 'HOSTLER',
        required: true,
    },
    CurrentYear: {
        type: Number,
        enum: [1, 2],
        default: 1,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

