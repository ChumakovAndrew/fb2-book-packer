import { surveyController } from "./Controllers/surveyController.mjs"
import { imgSaver } from "./Services/imgSaver.mjs"
async function main() {
    const descriptionObj = await surveyController() // опросник 
    await imgSaver(descriptionObj.url, 'test.jpg')
    console.log(descriptionObj)
}

main()