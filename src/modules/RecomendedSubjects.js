import { titleConsole } from "../utils/console.js"
import { GET_RECOMMENDED_SUBJECTS } from "../utils/identifiers.js"
import { backToMenu } from "../utils/iteraction.js"
import { APPROVED, FAILED, PENDING, VALIDATED } from "../utils/subject.js"
import { readFile } from "./File.js"

let RECOMMENDED_SUBJECTS = []
let ALL_SUBJECTS = []
    
const getRecommendedSubjects = async () => {
    console.clear();
    titleConsole(GET_RECOMMENDED_SUBJECTS);

    RECOMMENDED_SUBJECTS = []
    ALL_SUBJECTS = await readFile()
    for (const SUBJECT of ALL_SUBJECTS) {
        if (meetPrerequisite(SUBJECT) && isNotPassed(SUBJECT)) {
            const IMPACT = getImpact(SUBJECT);
            addToRecommendedSubjects(SUBJECT, IMPACT)
        }
    }

    console.table(RECOMMENDED_SUBJECTS)
    await backToMenu();
}

const meetPrerequisite = (subjectToEvaluate) => {
    let isUnlocked = !subjectToEvaluate.prerequisite
    
    if (!isUnlocked) {
        isUnlocked = ALL_SUBJECTS.some(subject => {
            const IS_PASSED = subject.status === VALIDATED || subject.status === APPROVED;
            const MATCH_PREREQUISITE = subjectToEvaluate.prerequisite === subject.code;
            return IS_PASSED && MATCH_PREREQUISITE;
        })
    }
    return isUnlocked;
}

const isNotPassed = (subjectToEvaluate) => {
    return subjectToEvaluate.status === PENDING || subjectToEvaluate.status === FAILED
}
const getImpact = (subjectToEvaluate) => {
    const SUBJECTS_TO_UNLOCK = ALL_SUBJECTS.filter(subject => {
        const IS_NOT_PASSED = isNotPassed(subject);
        const MATCH_PREREQUISITE = subjectToEvaluate.code === subject.prerequisite;
        return IS_NOT_PASSED && MATCH_PREREQUISITE;
    })
    return SUBJECTS_TO_UNLOCK.length;
}
const addToRecommendedSubjects = (subjectToAdd, impact) => {
    const POSITION = RECOMMENDED_SUBJECTS.findIndex(subject => subject.impact < impact)
    if (POSITION > -1) {
        RECOMMENDED_SUBJECTS.splice(POSITION, 0, {...subjectToAdd, impact});
    } else {
        RECOMMENDED_SUBJECTS.push({...subjectToAdd, impact});
    }
    if (RECOMMENDED_SUBJECTS.length > 10) RECOMMENDED_SUBJECTS.pop();
}

export default getRecommendedSubjects;