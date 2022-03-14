import figlet from 'figlet';
import chalk from 'chalk';
import inquirer from 'inquirer';
import Pensum from './Pensum.js';
import Subject from './Subject.js';

// Utils
import {Menu, SearchSubmenu, ADD, EDIT, LIST, SEARCH, SEARCH_ANOTHER, BACK_TO_MENU, REMOVE, RemoveSubmenu, REMOVE_ANOTHER, REMOVE_THIS, UpdateSubmenu, EDIT_ANOTHER, EDIT_THIS, MiniSearchSubmenu } from '../utils/menu.js';
import {errorConsole, infoConsole, loadingConsole, separatorConsole, successConsole, titleConsole} from '../utils/console.js'
import Status, { PENDING } from '../utils/subject.js';

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

    case SEARCH:
      searchSubject();
      break;
    
    case REMOVE:
      removeSubject();
      break;

    case EDIT:
      updateSubject();
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
    {message: 'Status:', type: 'list', choices: [...Status]}
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

export const searchSubject = async () => {
  console.clear()
  titleConsole(SEARCH)
  const answer = await questionConsole([{message: "Search by name:"}])
  const subject = await pensum.getSubjectByName(answer['Search by name:'])

  if (subject) {
    console.table(subject) 
    await searchSubmenu(subject)
  } else {
    infoConsole(`Can't find a subject for: ${answer['Search by name:']}`)
    await miniSearchSubmenu();
  }
}

const searchSubmenu = async (subject) => {
  const action = await inquirer.prompt([{
    type: 'list',
    message: "What do you want to do:", 
    name: 'menu', 
    choices: [...SearchSubmenu],
  }])

  switch (action.menu) {

    case SEARCH_ANOTHER:
      searchSubject();
      break;

    case REMOVE_THIS:
      pensum.removeSubject(subject);
      successConsole("Subject removed successfully!")
      backToMenu()
      break;

    case EDIT_THIS:
      
      answer = await questionConsole([
        {message: 'Code:', def: subject.code},
        {message: 'Name:', def: subject.name},
        {message: 'Credit:', def: subject.credit},
        {message: 'Prerequisite:', def: subject.prerequisite},
        {message: 'Status:', type: 'list', choices: [...Status]}
      ])
  
      const subjectUpdated = new Subject(
        answer['Code:'], 
        answer['Name:'], 
        answer['Credit:'], 
        answer['Prerequisite:'], 
        answer['Status:']
      )
      
      pensum.updateSubject(subjectUpdated, subject);
      successConsole("Subject updated successfully!")
      backToMenu()
      break;
    
    case BACK_TO_MENU:
      welcome();
      break
  
    default:
      console.log('nothing');
      break;
  }
}

const miniSearchSubmenu = async () => {
  const action = await inquirer.prompt([{
    type: 'list',
    message: "What do you want to do:", 
    name: 'menu', 
    choices: [...MiniSearchSubmenu],
  }])

  switch (action.menu) {

    case SEARCH_ANOTHER:
      searchSubject();
      break;
    
    case BACK_TO_MENU:
      welcome();
      break
  
    default:
      console.log('nothing');
      break;
  }
}

const removeSubject = async () => {
  console.clear()
  titleConsole(REMOVE)
  const answer = await questionConsole([{message: "Search by name:"}])
  const subject = pensum.getSubjectByName(answer['Search by name:'])


  if (subject) {
    // CONFIRMATION
    console.table(subject)
    separatorConsole()
    let confirmation = await yesOrNot("Are you sure you want to remove this subject?");
    if (confirmation) {
      pensum.removeSubject(subject)
      successConsole("Subject removed successfully!")
    } else {
      infoConsole("Subject not removed")
    }
  } else {
    infoConsole(`Can't find a subject for: ${answer['Search by name:']}`)
  }

  await removeSubmenu()
}

const removeSubmenu = async () => {
  const action = await inquirer.prompt([{
    type: 'list',
    message: "What do you want to do:", 
    name: 'menu', 
    choices: [...RemoveSubmenu],
  }])

  switch (action.menu) {

    case REMOVE_ANOTHER:
      removeSubject();
      break;
    
    case BACK_TO_MENU:
      welcome();
      break;
  }
}

const updateSubject = async () => {
  console.clear()
  titleConsole(EDIT)
  let answer = await questionConsole([{message: "Search by name:"}])
  const oldSubject = pensum.getSubjectByName(answer['Search by name:'])

  if (oldSubject) {
    console.table(oldSubject)
    separatorConsole()

    answer = await questionConsole([
      {message: 'Code:', def: oldSubject.code},
      {message: 'Name:', def: oldSubject.name},
      {message: 'Credit:', def: oldSubject.credit},
      {message: 'Prerequisite:', def: oldSubject.prerequisite},
      {message: 'Status:', type: 'list', choices: [...Status]}
    ])
  
    const subjectUpdated = new Subject(
      answer['Code:'], 
      answer['Name:'], 
      answer['Credit:'], 
      answer['Prerequisite:'], 
      answer['Status:']
    )

    const confirmation = await yesOrNot("Are you sure you want to update this subject?");
    if (confirmation) {
      pensum.updateSubject(subjectUpdated, oldSubject);
      successConsole("Subject updated successfully!")
    } else {
      infoConsole("Subject not updated")
    }
  } else {
    infoConsole(`Can't find a subject for: ${answer['Search by name:']}`)
  }

  await editSubmenu()
  
}

const editSubmenu = async () => {
  const action = await inquirer.prompt([{
    type: 'list',
    message: "What do you want to do:", 
    name: 'menu', 
    choices: [...UpdateSubmenu],
  }])

  switch (action.menu) {

    case EDIT_ANOTHER:
      updateSubject();
      break;
    
    case BACK_TO_MENU:
      welcome();
      break;
  }
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