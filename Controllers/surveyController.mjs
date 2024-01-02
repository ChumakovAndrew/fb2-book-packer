import inquirer from "inquirer"

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
            name: "coverUrl",
            message: "Введите URL адрес изображения:",
            when: (answers) => answers.addMethod == addingMethods.URL,
        },
        {
            type: "input",
            name: "coverUrl",
            message: "Введите расположение файла:",
            when: (answers) => answers.addMethod == addingMethods.PATH,
        },
    ];
    
    return await inquirer.prompt(questions).then((answers) => {
        return JSON.stringify(answers, null, '  ')
    });
}

export { surveyController }


