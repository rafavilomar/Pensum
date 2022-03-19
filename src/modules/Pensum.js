import { readFile, writeFile } from "./File.js";

class Pensum {
  constructor() {
    new Promise(async (resolve, reject) => {
      try {
        this.subjectList = await readFile();
        resolve(this);
      } catch (error) {
        reject(error);
      }
    });
  }

  newSubject(subject) {
    return new Promise((resolve) => {
      const list = this.subjectList;
      list.push(subject);
      this.subjectList = list;

      resolve(this.subjectList);
    });
  }

  getSubjectByName(subjectName) {
    const subject = this.subjectList.find(
      (e) => e.name.toLowerCase() === subjectName
    );
    return subject;
  }

  getSubjectIndex(subject) {
    return this.subjectList.indexOf(subject);
  }

  removeSubject(subject) {
    const index = this.getSubjectIndex(subject);
    this.subjectList.splice(index, 1);
    this.savePensum();
  }

  updateSubject(subjectUpdated, oldSubject) {
    const index = this.getSubjectIndex(oldSubject);
    this.subjectList[index] = subjectUpdated;
    this.savePensum();
  }

  savePensum() {
    return writeFile(this.subjectList);
  }

  //= =====================

  getSubjectList() {
    return this.subjectList;
  }

  setSubjectList(value) {
    this.subjectList = value;
  }
}
export default Pensum;
