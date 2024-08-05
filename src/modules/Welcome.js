import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";
import Pensum from "./Pensum.js";

// Utils
import { Menu, ADD, EDIT, LIST, SEARCH, REMOVE, GET_RECOMMENDED_SUBJECTS } from "../utils/identifiers.js";
import addSubject from "./AddSubject.js";
import searchSubject from "./SearchSubject.js";
import removeSubject from "./RemoveSubject.js";
import updateSubject from "./EditSubject.js";
import { titleConsole } from "../utils/console.js";
import { backToMenu } from "../utils/iteraction.js";
import getRecommendedSubjects from "./RecomendedSubjects.js";

const pensum = new Pensum();

const welcome = () => {
  console.clear();
  figlet("Pensum", async (error, result) => {
    console.log(chalk.yellow(result));
    console.log(chalk.gray("--------------------------------------"));
    console.log(chalk.gray("Pensum-CLI              version: 1.0.0"));
    console.log(chalk.gray("--------------------------------------"));
    await menu();
  });
};

const menu = async () => {
  const action = await inquirer.prompt([
    {
      type: "list",
      message: "What do you want to do:",
      name: "menu",
      choices: [...Menu],
    },
  ]);

  switch (action.menu) {
    case LIST:
      showList();
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

    case GET_RECOMMENDED_SUBJECTS:
      getRecommendedSubjects();
      break;

    default:
      console.log("nothing");
      break;
  }
};

const showList = async () => {
  console.clear();
  titleConsole(LIST);
  console.table(await pensum.getSubjectList());

  await backToMenu();
};

export default welcome;
