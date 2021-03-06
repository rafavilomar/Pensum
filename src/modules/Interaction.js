import figlet from 'figlet';
import chalk from 'chalk';
import inquirer from 'inquirer';
import Pensum from './Pensum.js';
import Subject from './Subject.js';

// Utils
import Menu, { ADD, LIST } from '../utils/menu.js';
import {loadingConsole, successConsole, titleConsole} from '../utils/console.js'
import { PENDING } from '../utils/subject.js';

//=============================================================================================

let pensum = await new Pensum()

export const welcome = () => {
  console.clear()
  figlet('Pensum', async (error, result) => {
    console.log(chalk.yellow(result));
    console.log(chalk.gray('--------------------------------------'));
    console.log(chalk.gray('Pensum-CLI              version: 1.0.0'));
    console.log(chalk.gray('--------------------------------------'));
    await menu()
  })
}

export const menu = async () => {
  const action = await inquirer.prompt([{
    type: 'list',
    message: "What do you want to do:", 
    name: 'menu', 
    choices: [...Menu],
  }])

  switch (action.menu) {
    case LIST:
      showList(pensum.getSubjectList());
      break;
    
    case ADD:
      addSubject();
      break;
  
    default:
      console.log('nothing');
      break;
  }
}

export const showList = async (list) => {
  console.clear()
  titleConsole(LIST)
  console.table(list)

  await backToMenu()
}

export const addSubject = async () => {
  console.clear()
  titleConsole(ADD)
  let answer = await questionConsole([
    {message: 'Code:'},
    {message: 'Name:'},
    {message: 'Credit:'},
    {message: 'Prerequisite:'},
    {message: 'Status:', def: PENDING}
  ])

  let subject = new Subject(
    answer['Code:'], 
    answer['Name:'], 
    answer['Credit:'], 
    answer['Prerequisite:'], 
    answer['Status:']
  )
  pensum.newSubject(subject).then(async () => {
    console.table(subject)
    let save = await yesOrNot('Save changes?')
    if (save) {
      loadingConsole('Saving changes...')
      pensum.savePensum().then(() => {
        setTimeout(async () => {
          successConsole('Save successfully!')
          let addMore = await yesOrNot('Add more subjects?')
          if (addMore) {
            addSubject()
          } else {
            welcome()
          }
        }, 1000);
      })
    } else {
      welcome()
    }
  })
  
}

export const questionConsole = async (questions = [{message, def, type, choices}]) => {

  let format = [];
  questions.map(q => {
    format.push({
      name: q.message,
      default: q.def,
      message: q.message,
      type: q.type,
      choices: q.choices
    })
  })
  
  const action = await inquirer.prompt(format)
  return action
}

export const backToMenu = async () => {
  let answer = await questionConsole([{message: 'Back to menu?', def: 'Yes'}])
  if ( answer['Back to menu?'].toLowerCase() === 'yes' || answer['Back to menu?'].toLowerCase() === 'y') {
    console.clear()
    await welcome()
  } else {
    backToMenu()
  }
}

export const yesOrNot = async (question) => {
  let answer = await questionConsole([{message: question, def: 'Yes'}])
  if ( answer[question].toLowerCase() === 'yes' || answer[question].toLowerCase() === 'y') {
    return true;
  } else {
    return false;
  }

}