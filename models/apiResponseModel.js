import mongoose from "mongoose";

const apiResponseSchema = new mongoose.Schema({
    response: {
        type: String,
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }
});

const apiResponse = mongoose.model("api_response", apiResponseSchema);

export default apiResponse;