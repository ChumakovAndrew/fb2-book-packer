import chalk from 'chalk';

const {bgRed, bgGreen, red, green} = chalk;

const printError = (error) => {
    console.log(bgRed(' ERROR ') + " " + red(error));
};

const printSuccess = (message) => {
	console.log(bgGreen(' SUCCESS ') + ' ' + green(message));
};

export {printError, printSuccess}