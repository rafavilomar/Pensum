import chalk from "chalk";
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  //output: process.stdout
});

//==================================================================================

export const errorConsole = (value) => {
  console.error(chalk.bgRed(value));
}

export const infoConsole = (value) => {
  console.info(chalk.gray(value));
}

export const separatorConsole = () => {
  new inquirer.Separator()
}

export const titleConsole = (value) => {
  console.log(chalk.yellow(`>> ${value}`));
}

export const loadingConsole = (value) => {
  console.log(chalk.bgWhite.black(value))
}

export const successConsole = (value) => {
  console.log(chalk.bgGreen.black(value));
}

export const readConsole = () => {
  return new Promise((resolve, reject) => {
    rl.question('',(answer) => {
      resolve(answer)
      rl.close()
    })
  })
}