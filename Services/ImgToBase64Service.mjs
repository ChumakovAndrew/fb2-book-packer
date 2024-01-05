import imageToBase64 from "image-to-base64";
import { printError } from "./logService.mjs";

const imageToBase64Service = async (path) => {
    return await imageToBase64(path) // Path to the image
    .then(
        (response) => {
            return response;
        }
    )
    .catch(
        (error) => {
            printError(error); // Logs an error if there was one
        }
    )
}

export {imageToBase64Service}
