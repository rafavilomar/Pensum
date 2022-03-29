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
import { questionConsole, yesOrNot } from "../utils/iteraction.js";
import welcome from "./Welcome.js";

const pensum = new Pensum();

const removeSubject = async () => {
  console.clear();
  titleConsole(REMOVE);
  const answer = await questionConsole([{ message: "Search by name:" }]);
  const subject = await pensum.getSubjectByName(answer["Search by name:"]);

  if (subject) {
    // CONFIRMATION
    console.table(subject);
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
  } else {
    infoConsole(`Can't find a subject for: ${answer["Search by name:"]}`);
  }

  await removeSubmenu();
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
