const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

function generateSVG(color, shape, text) {
    let svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <rect width="100%" height="100%" fill="${color}" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="white">${text}</text>
    </svg>
    `;
    return svgContent.trim();
}

async function promptUser() {
    const questions = [
        {
            type: 'input',
            name: 'text',
            message: 'Enter text for the logo:'
        },
        {
            type: 'list',
            name: 'color',
            message: 'Select a color for the logo:',
            choices: ['green']
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Select a shape for the logo:',
            choices: ['circle']
        }
    ];

    const answers = await inquirer.prompt(questions);
    return answers;
}

function saveSVGToFile(svgContent, filename) {
    const filePath = path.join(__dirname, `${filename}.svg`);
    fs.writeFileSync(filePath, svgContent);
    console.log(chalk.green(`SVG saved successfully to ${filePath}`));
}

async function run() {
    console.log(chalk.blue('Welcome to Logo Generator CLI!'));

    try {
        const userInput = await promptUser();
        const { color, shape, text } = userInput;

        const svgContent = generateSVG(color, shape, text);

        const filename = `${text.toLowerCase().replace(/\s+/g, '-')}-logo`;
        saveSVGToFile(svgContent, filename);
    } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
    }
}

run();
