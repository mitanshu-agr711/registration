const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    teamname: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => /^[a-zA-Z]{3,20}$/.test(value),
            message: 'teamname is not valid',
        },
    },
    names: [{
        type: String,
        required: true,
        validate: {
            validator: value => /^[a-zA-Z]{3,20}$/.test(value),
            message: 'Name is not valid',
        },
    }],
    email: [{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => /^[a-z]+[0-9.]+@akgec\.ac\.in$/.test(value),
            message: 'Email is not valid or does not belong to akgec.ac.in domain',
        },
    }],
    contactNumber: [{
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: value => /^[6789]\d{9}$/.test(value),
            message: 'Phone number is not correct',
        },
    }],
    gender: [{
        type: String,
        required: true,
        enum: ['MALE', 'FEMALE'],
    }],
    studentId: [{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => /^(21|22|23)\d{5,6}(d|D)?$/.test(value),
            message: 'Student Id is not valid',
        },
    }],
    residence: [{
        type: String,
        enum: ['HOSTLER', 'DAYSCHOLAR'],
        default: 'HOSTLER',
        required: true,
    }],
    currentYear: [{
        type: Number,
        enum: [1, 2 , 3],
        default: 1,
        required: true,
    }],
    branch: [{
        type: String,
        enum: ['CSE','CSE-AIML','CSE-DS','CS','IT','CSIT','CS-Hindi','ECE','ME','EN','CIVIL'],
        required: true,
    }]
}, {
    timestamps: true
});

// Custom validators to limit the number of entries for 'names', 'email', 'contactNumber', 'gender', 'studentId', 'residence', and 'currentYear'
['names', 'email', 'contactNumber', 'gender', 'studentId', 'residence', 'currentYear'].forEach(field => {
    UserSchema.path(field).validate(function(value) {
        return value.length === 3;
    }, ` three ${field} are required`);
});

module.exports = mongoose.model('User', UserSchema);
