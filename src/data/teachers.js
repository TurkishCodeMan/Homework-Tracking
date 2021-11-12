import { sanitizeUser, validateUserForm } from "./auth-method"
import teacherData from "./teachers.json"

const teachersKey = '__teachers__'
let teachers = {}
const persist = () =>
  window.localStorage.setItem(teachersKey, JSON.stringify(teachers))
const load = () =>
  Object.assign(teachers, JSON.parse(window.localStorage.getItem(teachersKey)))

let teachersDB = [...teacherData]

// initialize
try {
  load()
  teachers = Object.values(teachersDB)
  persist()
} catch (error) {
  persist()
  // ignore json parse error
}


window.__myApp = window.__myApp || {}
window.__myApp.purgeteachers = () => {
  Object.keys(teachers).forEach(key => {
    delete teachers[key]
  })
  persist()
}


function readAll() {
  return teachersDB;
}

async function authenticate({ username, password }) {
  validateUserForm({ username, password })
  const user =
    teachersDB.find(st => st.email === username && st.password === password) || {}

  if (user && user.email && user.password) {
    return { ...sanitizeUser(user), token: btoa(user.id), type: 1 }
  }
  const error = new Error('Invalid username or password')
  error.status = 400
  throw error
}
async function getUser(userId) {
  const user =
    teachersDB.find(st => st.id === userId) || {}

  if (user && user.email && user.password) {
    return { ...sanitizeUser(user), token: btoa(user.id), type: 1 }
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