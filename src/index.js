import {readFile, writeFile} from './modules/File.js'
import {readConsole} from './modules/Interaction.js'

const main = async () => {
  let temp = await readFile();

  console.log(temp);
}


main();