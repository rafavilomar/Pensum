import {read, write} from './modules/File.js'

const main = async () => {
  let temp = await read();

  console.log(temp);
}


main();