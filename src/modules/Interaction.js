import readline from 'readline';
import figlet from 'figlet';
import chalk from 'chalk';
import inquirer from 'inquirer';
import Menu from '../utils/menu.js';

const rl = readline.createInterface({
  input: process.stdin,
  //output: process.stdout
});

export const welcome = () => {
  figlet('Pensum',async (error, result) => {
    console.log(result);
    console.log(chalk.gray('--------------------------------------'));
    console.log(chalk.gray('Pensum-CLI              version: 1.0.0'));
    console.log(chalk.gray('--------------------------------------'));
    let test = await menu()
    console.log(test.menu);
  })
}

export const menu = () => {
  return inquirer.prompt([{
    type: 'list',
    message: "What do you want to do:", 
    name: 'menu', 
    choices: [...Menu]
  }])
}

export const readConsole = () => {
  return new Promise((resolve, reject) => {
    rl.question('',(answer) => {
      resolve(answer)
      rl.close()
    })
  })
}