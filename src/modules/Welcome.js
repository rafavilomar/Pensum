import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";
import Pensum from "./Pensum.js";

// Utils
import {
  Menu,
  ADD,
  EDIT,
  LIST,
  SEARCH,
  REMOVE,
} from "../utils/identifiers.js";

const pensum = new Pensum();

export const welcome = () => {
  console.clear();
  figlet("Pensum", async (error, result) => {
    console.log(chalk.yellow(result));
    console.log(chalk.gray("--------------------------------------"));
    console.log(chalk.gray("Pensum-CLI              version: 1.0.0"));
    console.log(chalk.gray("--------------------------------------"));
    await menu();
  });
};

export const menu = async () => {
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
      console.log("nothing");
      break;
  }
};