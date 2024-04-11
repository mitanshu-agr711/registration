const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
        validate: {
            validator: value => /^[a-zA-Z\s]{3,20}$/.test(value),
            message: 'Username is not valid',
        },
    },
    email: {
        type: String,
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => /^[a-zA-Z0-9._-]+@akgec\.ac\.in$/.test(value),
            message: 'Email is not valid or does not belong to akgec.ac.in domain',

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
    gender: {
        type: String,
        required: true,
        // unique: true,
        enum: ['MALE', 'FEMALE'],
        default:'MALE'
    },
    studentId: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => /^(21|22|23)\d{5,6}(d|D)?$/.test(value),
            message: 'Student Id is not valid',
        },
    },
    residence: {
        type: String,
        enum: ['HOSTLER', 'DAYSCHOLAR'],
        default: 'HOSTLER',
        required: true,
    },
    currentYear: {
        type: Number,
        enum: [1, 2],
        default: 1,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

