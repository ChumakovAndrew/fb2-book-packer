import imagemin from 'imagemin';
import { homedir } from "os";
import { promises } from "fs"
import { join, basename } from "path";

import { surveyController, addingMethods } from "./Controllers/surveyController.mjs"
import { imgSaver } from "./Services/imgSaver.mjs"
import { docxParser } from './Services/docxParser.mjs';
import { xmlCrearerService } from './Services/xmlCreaterService.mjs';
import { imageToBase64Service } from './Services/ImgToBase64Service.mjs';


const {mkdir, rm, writeFile, rename} = promises

const pathCliDir = join(homedir(), '/AppData/Local/fb2-book-packer');
const pathDirTemp = join(pathCliDir, '/temp')
const tempFilePath = join(pathCliDir, 'temp/img.jpg')
const outputFilePath = join(pathCliDir, '/Cover')

async function main() {
    const descriptionObj = await surveyController() // опросник

    console.log(descriptionObj)
    await mkdir(pathCliDir, { recursive: true })

    if(descriptionObj.cover){
        if(descriptionObj.addMethod == addingMethods.URL){
            await mkdir(pathDirTemp, {recursive: true})
            await imgSaver(descriptionObj.url, tempFilePath)
            await imagemin([tempFilePath], { // оптимизация сораненной картинки
                destination: outputFilePath
            });
        }else {
            await imagemin([descriptionObj.pathImg], { // оптимизация сораненной картинки
                destination: outputFilePath
            });
            const oldImgName = join(outputFilePath, basename(descriptionObj.pathImg))
            const newImgName = join(outputFilePath, 'img.jpg');
            rename(oldImgName, newImgName)
        }
       
    }

    const imgBase64 = await imageToBase64Service(`${pathCliDir}/Cover/img.jpg`)

    const text = await docxParser(descriptionObj.pathDocx)

    const xmlCode = await xmlCrearerService(descriptionObj, text, imgBase64)

    await writeFile(`${pathCliDir}/file.fb2`, xmlCode)
    
    await rm(pathDirTemp, {recursive: true, force: true})
}

main()