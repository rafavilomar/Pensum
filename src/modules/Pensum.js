import { readFile, writeFile } from "./File.js";

class Pensum {
  static #instance
  #subjectList

  constructor() {
    readFile().then(list => this.#subjectList = list)
  }

  static getInstance(){
    if (!this.#instance) {
      this.#instance = new Pensum();
    }
    return this.#instance;
  }

  newSubject(subject) {
    this.#subjectList.push(subject);
    this.savePensum();
    return this.#subjectList;
  }

  async getSubjectByName(subjectName) {
    return this.#subjectList.find(
      (e) => e.name.toLowerCase() === subjectName.toLowerCase()
    );
  }

  async getSubjectIndex(subject) {
    return this.#subjectList.findIndex(
      (e) => JSON.stringify(e) === JSON.stringify(subject)
    );
  }

  async removeSubject(subject) {
    const index = await this.getSubjectIndex(subject);
    this.#subjectList.splice(index, 1);
    this.savePensum();
  }

  async updateSubject(subjectUpdated, oldSubject) {
    const index = await this.getSubjectIndex(oldSubject);
    this.#subjectList[index] = subjectUpdated;
    this.savePensum();
  }

  savePensum() {
    return writeFile(this.#subjectList);
  }

  //= =====================

  async getSubjectList() {
    // this.#subjectList = await readFile();
    return this.#subjectList;
  }

  setSubjectList(value) {
    this.#subjectList = value;
  }
}
export default Pensum;
