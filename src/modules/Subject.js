class Subject {

  constructor(code, name, credit, prerequisite, status){
      this.code = code;
      this.name = name;
      this.credit = credit;
      this.prerequisite = prerequisite;
      this.status = status;
  }

  //======================

  getCode(){
    return this.code
  }
  setCode(value){
    this.code = value;
  }

  getName(){
    return this.name
  }
  setName(value){
    this.name = value;
  }

  getCredit(){
    return this.credit
  }
  setCredit(value){
    this.credit = value;
  }

  getPrerequisite(){
    return this.prerequisite
  }
  setPrerequisite(value){
    this.prerequisite = value;
  }

  getStatus(){
    return this.status
  }
  setStatus(value){
    this.status = value;
  }
}
export default Subject;