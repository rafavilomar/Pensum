import { readFile } from "../modules/File.js";
import welcome from "../modules/Welcome.js";
import { errorConsole, loadingConsole } from "./console.js";
import { yesOrNot } from "./iteraction.js";


export const isValidPrerequisite = async (prerequisite) => {
    loadingConsole("Validating prerequisite...");
    const ALL_SUBJECTS = await readFile();
    return ALL_SUBJECTS.some(subject => subject.code === prerequisite)
  }
  
export const wrongPrerequisiteMessage = async (prerequisite, tryAgain) => {
    errorConsole(`Could not find an existing subject to the prerequisite: ${prerequisite}`)
    const AGAIN = await yesOrNot("Try again?");
    if (AGAIN) {
    tryAgain();
    } else {
      welcome();
    }
  }