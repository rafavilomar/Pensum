import { readFile } from "./File.js";

class Pensum {
  
  constructor(){
    return new Promise(async (resolve, reject) => {
      try {
        this.subjectList = await readFile();
        resolve(this)
      } catch (error) {
        reject(error)
      }
    })
  }
  
  

  //======================

  getSubjectList(){
    return this.subjectList
  }
  setSubjectList(value){
    this.subjectList = value;
  }
  
}
export default Pensum;