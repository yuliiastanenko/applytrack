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
    <div className="max-w-sm mx-auto p-6 mt-12">
      <h1 className="text-2xl font-semibold mb-6">Log in</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
        <button className="bg-black text-white rounded-lg px-4 py-2 text-sm">
          Log in
        </button>
      </form>
    </div>
  )
}
