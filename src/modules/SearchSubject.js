import inquirer from "inquirer";
import Pensum from "./Pensum.js";
import Subject from "./Subject.js";

// Utils
import {
  SearchSubmenu,
  SEARCH,
  SEARCH_ANOTHER,
  BACK_TO_MENU,
  REMOVE_THIS,
  EDIT_THIS,
  MiniSearchSubmenu,
} from "../utils/identifiers.js";
import { successConsole, titleConsole } from "../utils/console.js";
import Status from "../utils/subject.js";
import {
  backToMenu,
  questionConsole,
  searchByName,
} from "../utils/iteraction.js";
import welcome from "./Welcome.js";

const pensum = new Pensum();

const searchSubmenu = async (subject) => {
  const action = await inquirer.prompt([
    {
      type: "list",
      message: "What do you want to do:",
      name: "menu",
      choices: [...SearchSubmenu],
    },
  ]);

  switch (action.menu) {
    case SEARCH_ANOTHER:
      searchSubject();
      break;

    case REMOVE_THIS:
      await pensum.removeSubject(subject);
      successConsole("Subject removed successfully!");
      backToMenu();
      break;

    case EDIT_THIS:
      const answer = await questionConsole([
        { message: "Code:", def: subject.code },
        { message: "Name:", def: subject.name },
        { message: "Credit:", def: subject.credit },
        { message: "Prerequisite:", def: subject.prerequisite },
        { message: "Status:", type: "list", choices: [...Status] },
      ]);

      const subjectUpdated = new Subject(
        answer["Code:"],
        answer["Name:"],
        answer["Credit:"],
        answer["Prerequisite:"],
        answer["Status:"]
      );

      await pensum.updateSubject(subjectUpdated, subject);
      successConsole("Subject updated successfully!");
      backToMenu();
      break;

    case BACK_TO_MENU:
      welcome();
      break;

    default:
      console.log("nothing");
      break;
  }
};

const searchSubject = async () => {
  console.clear();
  titleConsole(SEARCH);

  searchByName()
    .then((subject) => searchSubmenu(subject))
    .catch(() => miniSearchSubmenu());
};

const miniSearchSubmenu = async () => {
  const action = await inquirer.prompt([
    {
      type: "list",
      message: "What do you want to do:",
      name: "menu",
      choices: [...MiniSearchSubmenu],
    },
  ]);

  switch (action.menu) {
    case SEARCH_ANOTHER:
      searchSubject();
      break;

    case BACK_TO_MENU:
      welcome();
      break;

    default:
      console.log("nothing");
      break;
  }
};

export default searchSubject;
