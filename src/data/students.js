import {  sanitizeUser, validateUserForm } from "./auth-method"
import studentData from "./students.json"

const studentsKey = '__students__'
let students = {}
const persist = () =>
  window.localStorage.setItem(studentsKey, JSON.stringify(students))
const load = () =>
  Object.assign(students, JSON.parse(window.localStorage.getItem(studentsKey)))
  
let studentsDB=[...studentData]

// initialize
try {
  load()
  students=Object.values(studentsDB)
  persist()
} catch (error) {
  persist()
  // ignore json parse error
}


window.__myApp = window.__myApp || {}
window.__myApp.purgeStudents = () => {
  Object.keys(students).forEach(key => {
    delete students[key]
  })
  persist()
}


function readAll(){
  console.log(students)
  console.log(Array.from(students))
    return Array.from(students);
}

async function authenticate({ username, password }) {
  validateUserForm({ username, password })
  const user=
  studentsDB.find(st=>st.email===username && st.password===password) || {}

  if (user && user.email && user.password) {
      return { ...sanitizeUser(user), token: btoa(user.id),type:0 }
  }
  const error = new Error('Invalid username or password')
  error.status = 400
  throw error
}
async function getUser(userId){
  const user=
  studentsDB.find(st=>st.id===userId) || {}
  if (user && user.email && user.password) {
      return { ...sanitizeUser(user), token: btoa(user.id),type:0 }
  }
  const error = new Error('Invalid userId type')
  error.status = 400
  throw error
}



export {
    readAll,
    authenticate,
    getUser
}