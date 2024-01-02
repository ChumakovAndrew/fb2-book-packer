import { surveyController } from "./Controllers/surveyController.mjs"

async function main() {
    const descriptionObj = await surveyController() // опросник 
    
    console.log(descriptionObj)
}

main()