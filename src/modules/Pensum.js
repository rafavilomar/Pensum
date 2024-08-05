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

  async getSubjectByName(subjectName) {
    this.subjectList = await readFile();
    const subject = this.subjectList.find(
      (e) => e.name.toLowerCase() === subjectName.toLowerCase()
    );
    return subject;
  }

  async getSubjectIndex(subject) {
    this.subjectList = await readFile();
    return this.subjectList.indexOf(subject);
  }

  async removeSubject(subject) {
    const index = await this.getSubjectIndex(subject);
    this.subjectList.splice(index, 1);
    this.savePensum();
  }

  async updateSubject(subjectUpdated, oldSubject) {
    const index = await this.getSubjectIndex(oldSubject);
    this.subjectList[index] = subjectUpdated;
    this.savePensum();
  }

  savePensum() {
    return writeFile(this.subjectList);
  }

  //= =====================

  async getSubjectList() {
    this.subjectList = await readFile();
    return this.subjectList;
  }

  setSubjectList(value) {
    this.subjectList = value;
  }
}
export default Pensum;
