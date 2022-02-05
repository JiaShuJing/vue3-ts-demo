enum COOKIE_KEY {
  USERLIST = "user_list",
  CURRENTUSER = "current_user"
}

interface User {
  id: number
  username: string
  password: string
  createtime?: number
  updatetime?: number
}

function getUserList(username?: string, password?: string): User[] {
  let usersStr = localStorage.getItem(COOKIE_KEY.USERLIST)
  if (usersStr) {
    let users = JSON.parse(usersStr)
    if (username && password) {
      users.map((user: User) => {
        return user.username === username && user.password === password
      })
    } else if (username) {
      users.map((user: User) => {
        return user.username === username
      })
    } else if (password) {
      users.map((user: User) => {
        return user.password === password
      })
    } else {
      return users
    }
  }
  return []
}

function addUser(user: User): Boolean {
  user.createtime = new Date().getTime()
  user.updatetime = new Date().getTime()
  let userList = getUserList()
  userList.push(user)
  localStorage.setItem(COOKIE_KEY.USERLIST, JSON.stringify(userList))
  return true
}

function updateUser(user: User): Boolean {
  user.updatetime = new Date().getTime()
  let userList = getUserList()
  const index = userList.findIndex((u: User) => u.id === user.id)
  user = Object.assign(userList[index], user)
  const res = userList.splice(index, 1, user) //替换指定下标的数组元素
  localStorage.setItem(COOKIE_KEY.USERLIST, JSON.stringify(userList))
  return Boolean(res)
}

function delUser(id: number): Boolean {
  let userList = getUserList()
  const index = userList.findIndex((u: User) => u.id === id)
  const res = userList.splice(index, 1) //删除指定下标的数组元素
  localStorage.setItem(COOKIE_KEY.USERLIST, JSON.stringify(userList))
  return Boolean(res)
}

export { User, getUserList, delUser, addUser, updateUser }
