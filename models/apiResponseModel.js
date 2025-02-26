import mongoose from "mongoose";

const apiResponseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    mobileNumber: {
        type: String,
        required: true,
        min: 10,
        max: 10,
    },
    email: {
        type: String,
        required: false,
        default: null,
        min: 5,
        max: 255,
    },
    type: {
        type: String,
        required: true,
        min: 2,
        max: 95,
    },
    message: {
        type: String,
        required: true,
        min: 10,
        max: 1000,
    },
    ip: {
        type: String,
        required: false,
    },
    agent: {
        type: String,
        required: false,
    },
    referer: {
        type: String,
        required: false,
    },
    src: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const apiResponse = mongoose.model("api_response", apiResponseSchema);

export default apiResponse;