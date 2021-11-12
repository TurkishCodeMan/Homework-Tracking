// pretend this is firebase, netlify, or auth0's code.
// you shouldn't have to implement something like this in your own app

const localStorageKey = '__my_token__'
const localStorageTypeKey = '__my_token_type__'

async function getUser() {
  const {token,type} = getToken();
  if (token) {
      return fetchUser(token,type);
  }
}

async function fetchUser(token,type){
  return client('user', { method: 'GET', data:{token,type} }).then(userResponse)
}

function userResponse(res) {
  return res.user;
}

 function getToken() {
  return {
    token:window.localStorage.getItem(localStorageKey),
    type:window.localStorage.getItem(localStorageTypeKey)
  }
}

function handleUserResponse({user}) {
  window.localStorage.setItem(localStorageKey, user.token)
  window.localStorage.setItem(localStorageTypeKey,user.type)
  return user
}

function login({username, password,type}) {
  console.log(username,password,type)
  return client('login', {data:{username, password,type}}).then(handleUserResponse)
}

function register({username, password}) {
  return client('register', {data:{username, password}}).then(handleUserResponse)
}

async function logout() {
  window.localStorage.removeItem(localStorageKey)
  window.localStorage.removeItem(localStorageTypeKey)

}

// an auth provider wouldn't use your client, they'd have their own
// so that's why we're not just re-using the client
const authURL = process.env.REACT_APP_AUTH_URL

async function client(endpoint, {data,method,options}) {
  const config = {
    method: data?'POST':'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {'Content-Type': 'application/json'},
    ...options
  }
  return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {getToken,getUser, login, register, logout, localStorageKey}
