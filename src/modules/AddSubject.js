import Pensum from "./Pensum.js";
import Subject from "./Subject.js";

// Utils
import { ADD } from "../utils/identifiers.js";
import {
  loadingConsole,
  successConsole,
  titleConsole,
} from "../utils/console.js";
import Status from "../utils/subject.js";
import welcome from "./Welcome.js";
import { questionConsole, yesOrNot } from "../utils/iteraction.js";
import {
  isValidPrerequisite,
  wrongPrerequisiteMessage,
} from "../utils/prerequisite.js";
import { isUniqueCode, wrongCodeMessage } from "../utils/code.js";

const pensum = Pensum.getInstance();

const addSubject = async () => {
  console.clear();
  titleConsole(ADD);
  const answer = await questionConsole([
    { message: "Code:" },
    { message: "Name:" },
    { message: "Credit:" },
    { message: "Prerequisite:" },
    { message: "Status:", type: "list", choices: [...Status] },
  ]);

  const subject = new Subject(
    answer["Code:"],
    answer["Name:"],
    answer["Credit:"],
    answer["Prerequisite:"],
    answer["Status:"]
  );
  
  console.table(subject);
  const save = await yesOrNot("Save changes?");
  if (save) {
    if (!(await isUniqueCode(subject.code))) {
        return wrongCodeMessage(subject.code, addSubject);
    }
    if (
      subject.prerequisite &&
      !(await isValidPrerequisite(subject.prerequisite))
    ) {
      return wrongPrerequisiteMessage(subject.prerequisite, addSubject);
    }
    loadingConsole("Saving changes...");
    pensum.newSubject(subject)
      setTimeout(async () => {
        successConsole("Save successfully!");
        const addMore = await yesOrNot("Add more subjects?");
        if (addMore) {
          addSubject();
        } else {
          welcome();
        }
      }, 1000);
  } else {
    welcome();
  }
};

export default addSubject;
