import { hash } from "./auth-method"

const homeworksKey = '__homeworks__'
let homeworks = {}
const persist = () =>
    window.localStorage.setItem(homeworksKey, JSON.stringify(homeworks))
const load = () =>
    Object.assign(homeworks, JSON.parse(window.localStorage.getItem(homeworksKey)))

// initialize
try {
    load()
    homeworks = [

        ...Object.values(homeworks)
    ]
    persist()
} catch (error) {
    persist()
    // ignore json parse error
}


window.__myApp = window.__myApp || {}
window.__myApp.purgeStudents = () => {
    Object.keys(homeworks).forEach(key => {
        delete homeworks[key]
    })
    persist()
}

async function read(id) {

    return homeworks[id]
}
async function readAll() {
    console.log(homeworks)
    return Array.from(homeworks)
}

async function readUserHomework(userId) {
    const homeWorkArray = Array.from(homeworks)
    return homeWorkArray.filter((hm) => hm.studentId === userId)
}


async function create({ subject, studentId, teacherId, completed, deadLine }) {
    const id = hash(`${studentId}${teacherId}${Math.random(2000) + 1}`)
    homeworks.push({
        id: id,
        subject: subject,
        deadLine: new Date(deadLine),
        completed: completed,
        studentId: studentId,
        teacherId: teacherId
    })
    persist()
    return read(id)
}

async function deleteHomework(homeWorkId) {
    const newHomeWorks = Array.from(homeworks).filter(hm => {
        return hm.id !== homeWorkId
    })
    homeworks = [...newHomeWorks]
    persist()
    return true;
}
const convertArrayToObject = (array, key) =>
    // eslint-disable-next-line no-sequences
    array.reduce((acc, item) => (acc[item[key]] = item, acc), {});

async function completeHomework(homeWorkId) {
    const hmObject = convertArrayToObject(homeworks, "id")
    hmObject[homeWorkId].completed = !hmObject[homeWorkId].completed
    homeworks = [
        ...Object.values(hmObject)
    ]
    persist()
    return true;

}


// async function completeHomework(studentId,homeWorkId){
//     const student=studentsDB.find((st=>st.id===studentId))

// }



export {
    create,
    deleteHomework,
    readAll,
    readUserHomework,
    completeHomework
}