
import apiResponseModel from "../models/apiResponseModel.js";

export const apiResponse = async ( req , res , next ) => {
    try {

        // apiResponseModel


    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Internal Server Error",
        });
    };
};