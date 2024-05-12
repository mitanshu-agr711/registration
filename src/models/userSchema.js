const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    teamname: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => /^[a-zA-Z\s]{3,20}$/.test(value),
            message: 'Teamname is not valid',
        },
    },
    name: {
        type: [String],
        required: true,
        validate: [
            {
                validator: value => value.length === 3,
                message: 'Exactly three names are required',
            },
            {
                validator: value => value.every(name => /^[a-zA-Z\s]{3,20}$/.test(name)),
                message: 'Each name should be between 3 and 20 characters and contain only letters and spaces',
            }
        ]
    },
    email: {
        type: [String],
        required: true,
        unique: true,
        validate: [
            {
                validator: value => value.length === 3,
                message: 'Exactly three emails are required',
            },
            {
                validator: value => value.every(email => /^[a-z]+[0-9.]+@akgec\.ac\.in$/.test(email)),
                message: 'Each email should be valid and belong to akgec.ac.in domain',
            }
        ]
    },
    contactNumber: {
        type: [Number],
        required: true,
        unique: true,
        validate: [
            {
                validator: value => value.length === 3,
                message: 'Exactly three contact numbers are required',
            },
            {
                validator: value => value.every(number => /^[6789]\d{9}$/.test(number)),
                message: 'Each contact number should be valid',
            }
        ]
    },
    gender: {
        type: [String],
        required: true,
        enum: ['MALE', 'FEMALE', 'OTHER'],
        default: ['MALE', 'MALE', 'MALE'] // Set default values for each person
    },
    studentId: {
        type: [String],
        required: true,
        unique: true,
        validate: [
            {
                validator: value => value.length === 3,
                message: 'Exactly three student IDs are required',
            },
            {
                validator: value => value.every(id => /^(21|22|23)\d{5,6}(d|D)?$/.test(id)),
                message: 'Each student ID should be valid',
            }
        ]
    },
    residence: {
        type: [String],
        enum: ['HOSTELER', 'DAY SCHOLAR'],
        default: ['HOSTELER', 'HOSTELER', 'HOSTELER'], // Set default values for each person
        required: true,
    },
    currentYear: {
        type: [Number],
        enum: [1, 2 , 3],
        default: [1, 1, 1], // Set default values for each person
        required: true,
    },
    branch: {
        type: [String],
        required: true,
        enum: ['CSE','CSE-AIML','CSE-DS','CS','IT','CSIT','CS-Hindi','ECE','ME','EN','CIVIL']
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
