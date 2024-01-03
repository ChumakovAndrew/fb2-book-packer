import inquirer from "inquirer"
import { isValidUrl } from "../Helpers/isValidUrl.mjs";
import { printError } from "../Services/logService.mjs";

const returnQuestion = async (question) => {
    return await inquirer.prompt(question).then(async (answers) => {
        return answers
    });
}

const surveyController = async () => {
    const addingMethods = {
        URL: "URL",
        PATH: 'PATH'
    }

    const questions = [
        {
            type: "input",
            name: "name",
            message: "Введите название книги:",
            default: undefined,
        },
        {
            type: "input",
            name: "author",
            message: "Введите автора книги:",
            default: undefined,
        },
        {
            type: "confirm",
            name: "cover",
            message: "Хотите добавить обложку?",
            default: false,
        },
        {
            type: "list",
            name: "addMethod",
            message: "Каким способом вы хотите добавить обложку:",
            choices: [addingMethods.URL, addingMethods.PATH],
            when: (answers) => answers.cover !== false,
        },
        {
            type: "input",
            name: "url",
            message: "Введите URL адрес изображения:",
            when: (answers) => answers.addMethod == addingMethods.URL,
        },
        {
            type: "input",
            name: "path",
            message: "Введите расположение файла:",
            when: (answers) => answers.addMethod == addingMethods.PATH,
        },
    ];
    
    return await inquirer.prompt(questions).then(async (answers) => {

        let url = answers.urlS

        while(!isValidUrl(url)){
            printError("Вы ввели невалидный URL адрес. Пожалуйста, проверьте ввод.")
            const ans = await returnQuestion([{
                type: "input",
                name: "url",
                message: "Введите URL адрес изображения:",
            }])

            url = ans.url
        }

        return {...answers, url: url}
        // return JSON.stringify(answers, null, '  ')
    });
}

export { surveyController }


