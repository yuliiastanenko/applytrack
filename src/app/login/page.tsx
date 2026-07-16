"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (event) => {
    event.preventDefault()

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      router.push("/applications")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div>
          Email: <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          Password: <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </div>
        <div>
          <button>Log in</button>
        </div>
      </form>
    </>
  )
}