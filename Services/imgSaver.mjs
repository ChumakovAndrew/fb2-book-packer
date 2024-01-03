import axios from 'axios';
import fs from 'fs'
import { printError, printSuccess } from './logService.mjs';

const imgSaver = async (imgUrl, path) => {
    await axios({
        method: 'get',
        url: imgUrl,
        responseType: 'stream'
    })
    .then((response) => {
        printSuccess('картинка сохраненна')
        response.data.pipe(fs.createWriteStream(path));
    })
    .catch((error) => {
        // handle error
        printError(error);
    });
}

export {imgSaver}