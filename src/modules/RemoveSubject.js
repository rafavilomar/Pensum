import inquirer from "inquirer";
import Pensum from "./Pensum.js";

// Utils
import {
  BACK_TO_MENU,
  REMOVE,
  RemoveSubmenu,
  REMOVE_ANOTHER,
} from "../utils/identifiers.js";
import {
  infoConsole,
  separatorConsole,
  successConsole,
  titleConsole,
} from "../utils/console.js";
import { searchByName, yesOrNot } from "../utils/iteraction.js";
import welcome from "./Welcome.js";

const pensum = new Pensum();

const removeSubject = async () => {
  console.clear();
  titleConsole(REMOVE);

  searchByName()
    .then(async (subject) => {
      separatorConsole();
      const confirmation = await yesOrNot(
        "Are you sure you want to remove this subject?"
      );
      if (confirmation) {
        await pensum.removeSubject(subject);
        successConsole("Subject removed successfully!");
      } else {
        infoConsole("Subject not removed");
      }
      removeSubmenu();
    })
    .catch(() => removeSubmenu());
};

const removeSubmenu = async () => {
  const action = await inquirer.prompt([
    {
      type: "list",
      message: "What do you want to do:",
      name: "menu",
      choices: [...RemoveSubmenu],
    },
  ]);

  switch (action.menu) {
    case REMOVE_ANOTHER:
      removeSubject();
      break;

    case BACK_TO_MENU:
      welcome();
      break;

    default:
      break;
  }
};

export default removeSubject;
