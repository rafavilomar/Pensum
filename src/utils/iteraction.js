import inquirer from "inquirer";
import welcome from "../modules/Welcome.js";

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
  if (
    answer[question].toLowerCase() === "yes" ||
    answer[question].toLowerCase() === "y"
  ) {
    return true;
  }
  return false;
};
