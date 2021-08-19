import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { errorConsole, infoConsole, separatorConsole } from '../utils/console.js';

// ----------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PATH = `${__dirname}/../file.json`

// ----------

export const readFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(PATH, (err, data) => {
      if (err) {
        writeFile([])
      }else{
        try {
          resolve(JSON.parse(data))
        } catch (error) {
          separatorConsole()
          errorConsole('Something was wrong with FILE.JSON.');
          infoConsole('Working on it... ')
          writeFile([])

          setTimeout(async () => {
            console.table(await readFile());
          }, 1500);
        }
      }
    })
  })
}

export const writeFile = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(PATH, JSON.stringify(data), (err) => {
      if (err) {
        reject(err)
      }else {
        resolve('Done!')
      }
    })
  })
}