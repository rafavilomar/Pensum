import inquirer from "inquirer";
import Pensum from "./Pensum.js";
import Subject from "./Subject.js";

// Utils
import {
  EDIT,
  BACK_TO_MENU,
  UpdateSubmenu,
  EDIT_ANOTHER,
} from "../utils/identifiers.js";
import {
  infoConsole,
  separatorConsole,
  successConsole,
  titleConsole,
} from "../utils/console.js";
import Status from "../utils/subject.js";
import { questionConsole, yesOrNot } from "../utils/iteraction.js";
import welcome from "./Welcome.js";

const pensum = new Pensum();

const updateSubject = async () => {
  console.clear();
  titleConsole(EDIT);
  let answer = await questionConsole([{ message: "Search by name:" }]);
  const oldSubject = await pensum.getSubjectByName(answer["Search by name:"]);

  if (oldSubject) {
    console.table(oldSubject);
    separatorConsole();

    answer = await questionConsole([
      { message: "Code:", def: oldSubject.code },
      { message: "Name:", def: oldSubject.name },
      { message: "Credit:", def: oldSubject.credit },
      { message: "Prerequisite:", def: oldSubject.prerequisite },
      { message: "Status:", type: "list", choices: [...Status] },
    ]);

    const subjectUpdated = new Subject(
      answer["Code:"],
      answer["Name:"],
      answer["Credit:"],
      answer["Prerequisite:"],
      answer["Status:"]
    );

    const confirmation = await yesOrNot(
      "Are you sure you want to update this subject?"
    );
    if (confirmation) {
      await pensum.updateSubject(subjectUpdated, oldSubject);
      successConsole("Subject updated successfully!");
    } else {
      infoConsole("Subject not updated");
    }
  } else {
    infoConsole(`Can't find a subject for: ${answer["Search by name:"]}`);
  }

  await editSubmenu();
};

const editSubmenu = async () => {
  const action = await inquirer.prompt([
    {
      type: "list",
      message: "What do you want to do:",
      name: "menu",
      choices: [...UpdateSubmenu],
    },
  ]);

  switch (action.menu) {
    case EDIT_ANOTHER:
      updateSubject();
      break;

    case BACK_TO_MENU:
      welcome();
      break;

    default:
      break;
  }
};

export default updateSubject;
