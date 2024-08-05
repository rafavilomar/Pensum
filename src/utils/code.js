import { readFile } from "../modules/File.js"
import welcome from "../modules/Welcome.js";
import { errorConsole } from "./console.js";
import { yesOrNot } from "./iteraction.js";

export const isUniqueCode_NewSubject = async (code) => {
    const ALL_SUBJECTS = await readFile();
    return !ALL_SUBJECTS.some((subject) => subject.code === code);
}

export const wrongCodeMessage = async (code, tryAgain) => {
    errorConsole(
        `The subject code must be unique: ${code}`
    );
    const AGAIN = await yesOrNot("Try again?");
    if (AGAIN) {
        tryAgain();
    } else {
        welcome();
    }
};