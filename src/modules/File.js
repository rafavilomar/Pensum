import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ----------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PATH = `${__dirname}/../file.json`

// ----------

export const read = () => {
  console.log(PATH);
  return new Promise((resolve, reject) => {
    fs.readFile(PATH, (err, data) => {
      if (err) {
        write([])
      }else{
        try {
          resolve(JSON.parse(data))
        } catch (error) {
          console.error('Something was wrong with FILE.JSON. We are working on it...');
          write([])
        }
      }
    })
  })
}

export const write = (data) => {
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