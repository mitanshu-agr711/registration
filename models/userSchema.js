import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
    username: {
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
    StudentId: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: value => /^(21|22)\d{7}$/.test(value),
            message: 'Student Id is not valid',
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: value => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
            message: 'Password is not valid',
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

const User = mongoose.model('User', UserSchema);
module.exports = User;
