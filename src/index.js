import {read, write} from './modules/File.js'
//const {read, write} = require('./modules/File.js')

const main = async () => {
  let temp = await read();

  temp = [...temp, {
    "name": "name"
  }]
    
  let temp2 = [{
    "name": "name"
  }] 
  await write(temp2);

  console.log(temp2);
  //console.table(temp2);
}


main();