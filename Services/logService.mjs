import chalk from 'chalk';

const {bgRed, bgGreen, red} = chalk;

const printError = (error) => {
    console.log(bgRed(' ERROR ') + " " + red(error));
};

const printSuccess = (message) => {
	console.log(bgGreen(' SUCCESS ') + ' ' + message);
};




export {printError, printSuccess}