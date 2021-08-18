import {read, write} from './modules/File.js'

const main = async () => {
  let temp = await read();
    
  let temp2 = [{
    "name": "name"
  }] 
  write(temp2);

  console.table(temp);
  console.table(temp2);
}


main();