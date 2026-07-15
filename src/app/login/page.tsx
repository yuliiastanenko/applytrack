"use client"

import { useState } from "react"

export default function Login() {
  const [persons, setPersons] = useState([
    { username: "jul23", password: "12345678" },
  ])
  const [newUser, setNewUser] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const handleLogin = (event) => {
    event.preventDefault()
    const found = persons.find((person) => person.username === newUser)
    if (found) {
      if (found.password === newPassword) {
        console.log("Log In correct")
      } else {
        alert("Incorrect password")
        return
      }
    } else {
      alert(`${newUser} is not exist`)
      return
    }
  }

  const handleUserChange = (event) => {
    setNewUser(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username: <input value={newUser} onChange={handleUserChange} />
        </div>
        <div>
          Password:{" "}
          <input value={newPassword} onChange={handlePasswordChange} />
        </div>
        <div>
          <button>Log in</button>
        </div>
      </form>
    </>
  )
}
