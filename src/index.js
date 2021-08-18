import {readFile, writeFile} from './modules/File.js'
import {readConsole} from './modules/Interaction.js'
import Pensum from './modules/Pensum.js';

const main = async () => {
  //let temp = await readFile();

  //console.log(temp);

  let pensum = await new Pensum();
  console.log(pensum.getSubjectList());
}


main();