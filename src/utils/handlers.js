import { sanitizeUser } from 'data/auth-method'
import { rest } from 'msw'
import * as studentsDB from "../data/students"
import * as teachersDB from "../data/teachers"
import * as homeworkDB from "../data/homeworks"
import * as classesDB from "../data/classes"

const apiUrl = process.env.REACT_APP_API_URL

let sleep
if (process.env.CI) {
  sleep = () => Promise.resolve()
} else if (process.env.NODE_ENV === 'test') {
  sleep = () => Promise.resolve()
} else {
  sleep = (
    t = Math.random() * ls('max_request_time__', 400) +
      ls('min_request_time__', 400),
  ) => new Promise(resolve => setTimeout(resolve, t))
}

function ls(key, defaultVal) {
  const lsVal = window.localStorage.getItem(key)
  let val
  if (lsVal) {
    val = Number(lsVal)
  }
  return Number.isFinite(val) ? val : defaultVal
}

const handlers = [
  rest.post(`${apiUrl}/login`, async (req, res, ctx) => {
    const { username, password, type } = req.body
    console.log(username, password, type)
    var user;
    if (username === "admin" && password === "admin") {
      user = {
        ...sanitizeUser({
          name: "admin",
          surname: "admin",
          email: "admin",
          password: "admin",
          id: 1,

        }), token: btoa(1)
      }
    }
    if (type === 0) {
      user = await studentsDB.authenticate({ username, password })
    }
    if (type === 1) {
      user = await teachersDB.authenticate({ username, password })
    }
    if (!type && !user) {
      const error = new Error('Invalid user')
      error.status = 400
      throw error
    }
    return res(ctx.json({ user }))
  }),

  rest.post(`${apiUrl}/user`, async (req, res, ctx) => {
    const { token, type } = req.body
    const userId = atob(token);
    console.log(userId, type)
    var user;
    if (userId === "1") {
      user = {
        ...sanitizeUser({
          name: "admin",
          surname: "admin",
          email: "admin",
          password: "admin",
          id: 1,

        }), token: btoa(1)
      }
    }
    if (type === '0') {
      user = await studentsDB.getUser(userId)
    }
    if (type === "1") {
      user = await teachersDB.getUser(userId)
    }

    return res(ctx.json({ user }))

  }),
  rest.get(`${apiUrl}/students`, async (req, res, ctx) => {
    const students = await studentsDB.readAll()
    if (!students) {
      return res(
        ctx.status(404),
        ctx.json({ status: 404, message: 'students not found' }),
      )
    }
    return res(ctx.json({ students }))
  }),

  rest.get(`${apiUrl}/teachers`, async (req, res, ctx) => {
    const teachers = await teachersDB.readAll()
    if (!teachers) {
      return res(
        ctx.status(404),
        ctx.json({ status: 404, message: 'teachers not found' }),
      )
    }
    return res(ctx.json({ teachers }))
  }),

  rest.get(`${apiUrl}/homeworks`, async (req, res, ctx) => {

    const homeworks = await homeworkDB.readAll()
    if (!homeworks) {
      return res(
        ctx.status(404),
        ctx.json({ status: 404, message: 'homeworks not found' }),
      )
    }
    return res(ctx.json({ homeworks }))
  }),

  rest.get(`${apiUrl}/homeworks/:userId`, async (req, res, ctx) => {
    const { userId } = req.params
    const homeworks = await homeworkDB.readUserHomework(userId)
    if (!homeworks) {
      return res(
        ctx.status(404),
        ctx.json({ status: 404, message: 'homeworks not found' }),
      )
    }
    return res(ctx.json({ homeworks }))
  }),

  rest.post(`${apiUrl}/homeworks`, async (req, res, ctx) => {
    const { subject, studentId, teacherId, completed, deadLine } = req.body
    const homework = await homeworkDB.create({
      subject, studentId, teacherId, completed, deadLine
    })
    return res(ctx.json({ homework }))
  }),


  rest.delete(`${apiUrl}/homeworks/:homeworkId`, async (req, res, ctx) => {
    const { homeworkId } = req.params
    await homeworkDB.deleteHomework(homeworkId)
    return res(ctx.json({ success: true }))
  }),
  
  rest.put(`${apiUrl}/students/complete-homeworks/:studentId/:homeWorkId`, async (req, res, ctx) => {
    const {  homeWorkId } = req.params
    await homeworkDB.completeHomework(homeWorkId)
    return res(ctx.json({ success: true }))

  }),

  rest.get(`${apiUrl}/teachers-users/:userId`,async (req,res,ctx)=>{
    const {  userId } = req.params
    const students = await classesDB.readUserStudents(userId)
    if (!students) {
      return res(
        ctx.status(404),
        ctx.json({ status: 404, message: 'students not found' }),
      )
    }
    return res(ctx.json({ students }))
  })


].map(handler => {
  const originalResolver = handler.resolver
  handler.resolver = async function resolver(req, res, ctx) {
    try {
      if (!(req)) {
        throw new Error('Request failure (for testing purposes).')
      }
      const result = await originalResolver(req, res, ctx)
      return result
    } catch (error) {
      const status = error.status || 500
      return res(
        ctx.status(status),
        ctx.json({ status, message: error.message || 'Unknown Error' }),
      )
    } finally {
      await sleep()
    }
  }
  return handler
})



export { handlers }