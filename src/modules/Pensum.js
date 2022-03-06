import { readFile, writeFile } from "./File.js";
import Subject from "./Subject.js";

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

  newSubject(subject){
    return new Promise((resolve, reject) => {
      let list = this.subjectList
      list.push(subject)
      this.subjectList = list

      resolve(this.subjectList);
    })
  }

  async getSubjectByName(subjectName) {
    const subject = this.subjectList.find(e => e.name.toLowerCase() === subjectName)
    return subject
  }
  
  savePensum(){
    return writeFile(this.subjectList)
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