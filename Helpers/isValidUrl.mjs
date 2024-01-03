import { URL } from "url";

const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

export {isValidUrl}