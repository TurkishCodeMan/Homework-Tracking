import { hash } from "./auth-method"
import studentData from "./students.json"

const classesKey = '__classes__'
let classes = {}
const persist = () =>
    window.localStorage.setItem(classesKey, JSON.stringify(classes))
const load = () =>
    Object.assign(classes, JSON.parse(window.localStorage.getItem(classesKey)))

let studentsData=[...studentData]

// initialize
try {
    load()
    classes=[
        ...Object.values(studentsData)
    ]
    classes[0].teacherId="1284"
    persist()
} catch (error) {
    persist()
    // ignore json parse error
}


window.__myApp = window.__myApp || {}
window.__myApp.purgeClasses = () => {
    Object.keys(classes).forEach(key => {
        delete classes[key]
    })
    persist()
}

async function read(id) {
    return classes[id]
}
async function readUserStudents(userId) {
    return classes.filter((st)=>{
        return st?.teacherId===userId
    })
}

async function readUserHomework(userId){
    const homeWorkArray=Array.from(classes)
    console.log(homeWorkArray,userId)
    return homeWorkArray.filter((hm)=>hm.studentId===userId)
}


async function create({subject, studentId, teacherId, completed, deadLine}) {
    const id = hash(`${studentId}${teacherId}${Math.random(2000)+1}`)
    classes.push({
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

async function deleteHomework(homeWorkId){
    const newclasses=Array.from(classes).filter(hm=>{
        return hm.id!==homeWorkId
    })
    classes=[...newclasses]
    persist()
    return true;
}
async function completeHomework(homeWorkId){
    const hm=Array.from(classes).find(hm=>{
        return hm.id===homeWorkId
    })
    const newHM={...hm,completed:!hm.completed}
    const newclasses=Array.from(classes).filter(hm=>{
        return hm.id!==homeWorkId
    })
    classes=[
        ...newclasses,
        newHM
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
    readUserHomework,
    completeHomework,
    readUserStudents
}