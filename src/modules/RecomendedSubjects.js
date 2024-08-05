/**
 * Handle a list of recommended subjects, but it will have this extra property:
 *      - impact: number (How many subject this subject unlock)
 * 
 * For each subject in the json:
 *      IF prerequisite is null OR (it correspond to an approved OR validated subject) 
 *      AND status == "PENDING" OR == "FAILED"
 *          count how many subject will be unlocked by this subject
 *          add it to the recommended subjects list
 * 
 * How to add a subject to the recommended list:
 *      IF there is another subject on the list with a lower impact
 *          put the new subject before that
 *      ELSE
 *          put the new subject at the end of the list
 * 
 *      IF the size of the recommended list > 10
 *          Delete the last subject
 */

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