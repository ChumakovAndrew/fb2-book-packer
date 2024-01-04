import imagemin from 'imagemin';
import { homedir } from "os";
import { promises } from "fs"
import { join } from "path";

import { surveyController, addingMethods } from "./Controllers/surveyController.mjs"
import { imgSaver } from "./Services/imgSaver.mjs"
import { docxParser } from './Services/docxParser.mjs';
import { xmlCrearerService } from './Services/xmlCreaterService.mjs';

const {mkdir, rm, writeFile} = promises

const pathCliDir = join(homedir(), '/AppData/Local/fb2-book-packer');
const pathDirTemp = join(pathCliDir, '/temp')
const tempFilePath = join(pathCliDir, 'temp/img.jpg')
const outputFilePath = join(pathCliDir, '/Cover')

async function main() {

    
    const descriptionObj = await surveyController() // опросник

    await mkdir(pathCliDir, { recursive: true })

    if(descriptionObj.cover){
        if(descriptionObj.addMethod == addingMethods.URL){
            await mkdir(pathDirTemp, {recursive: true})
            await imgSaver(descriptionObj.url, tempFilePath)
        }else {

        }
        await imagemin([tempFilePath], { // оптимизация сораненной картинки
            destination: outputFilePath
        });
    }

    const text = await docxParser(descriptionObj.pathDocx)

    xmlCrearerService(descriptionObj, text)

    
    await rm(pathDirTemp, {recursive: true, force: true})
}

main()