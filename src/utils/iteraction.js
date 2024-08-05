import inquirer from "inquirer";
import Pensum from "../modules/Pensum.js";
import welcome from "../modules/Welcome.js";
import { infoConsole } from "./console.js";

const pensum = new Pensum();

export const questionConsole = async (questions = []) => {
  const format = [];
  questions.forEach((q) => {
    format.push({
      name: q.message,
      default: q.def,
      message: q.message,
      type: q.type,
      choices: q.choices,
    });
  });

  const action = await inquirer.prompt(format);
  return action;
};

export const backToMenu = async () => {
  const answer = await questionConsole([
    { message: "Back to menu?", def: "Yes" },
  ]);
  if (
    answer["Back to menu?"].toLowerCase() === "yes" ||
    answer["Back to menu?"].toLowerCase() === "y"
  ) {
    console.clear();
    welcome();
  } else {
    backToMenu();
  }
};

export const yesOrNot = async (question) => {
  const answer = await questionConsole([{ message: question, def: "Yes" }]);
  return (
    answer[question].toLowerCase() === "yes" ||
    answer[question].toLowerCase() === "y"
  );
};

export const searchByName = async () => {
  const answer = await questionConsole([{ message: "Search by name:" }]);
  const subject = await pensum.getSubjectByName(answer["Search by name:"]);

  if (subject) {
    console.table(subject);
    return Promise.resolve(subject);
  }
  infoConsole(`Can't find a subject for: ${answer["Search by name:"]}`);
  await Promise.reject();
};
