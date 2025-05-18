"use client"; // Add this to mark this as a client-side component

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {

  const router = useRouter()
  // State to manage form input values
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  // Reset errors
  setErrors({
    email: '',
    password: ''
  })

  // Validate fields
  let isValid = true
  let newErrors = { ...errors }

  if (!email) {
    newErrors.email = 'Email is required.'
    isValid = false
  }

  if (!password) {
    newErrors.password = 'Password is required.'
    isValid = false
  }

  setErrors(newErrors)

  // Hardcoded login logic
  if (isValid) {
    if (email === 'admin@gmail.com' && password === 'admin') {
      console.log('Logged in as admin')
      router.push('/dashboard')
    } else {
      setErrors({
        email: '',
        password: 'Invalid email or password.'
      })
    }
  }
}


  // Handle input changes and clear error messages when user starts typing
  const [isEmailFocused, setIsEmailFocused] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }))
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center relative 
    font-sans overflow-hidden bg-white px-8">
       <div
        className="w-full max-w-md bg-white rounded-xl shadow-sm border border-[#3F54D1] p-8 text-center"
        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="mb-6 flex flex-col items-center">
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-70 h-32 bg-gradient-to-br from-[#dbe4ff] to-white rounded-full blur-2xl z-0" />
          <Image src="/logo.png" alt="Logo" width={150} height={150} className="relative z-10"  />
          <h1 className="text-4xl font-semibold text-[#3F54D1] mt-10">
            Welcome back
          </h1>
          <p className="text-sm text-[#808080] mt-1">
            Please enter your details to login
          </p>
        </div>

        <form className="text-left space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-[#000000] block mb-1">
              Your Email Address
            </label>
            <input
  type="email"
  placeholder={isEmailFocused || email ? '' : 'name@email.com'}
  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2e2eff]"
  value={email}
  onFocus={() => setIsEmailFocused(true)}
  onBlur={() => setIsEmailFocused(false)}
  onChange={handleEmailChange}
/>

            {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-[#000000] block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2e2eff]"
                value={password}
                onChange={handlePasswordChange}
              />
              {errors.password && <p className="text-red-500 text-[10px] mt-1">{errors.password}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            {/* <a href="forgotpassword" className="text-[#000000] hover:underline">
              Forgot password?
            </a> */}
          </div>

          <button
            type="submit"
            className="w-full bg-[#000000] text-white py-2 rounded-md text-sm hover:bg-[#3F54D1]"
          >
            Login
          </button>
        </form>

        {/* <p className="text-sm text-[#808080] mt-6">
          Don’t have an account?{' '}
          <a href="signup" className="text-[#000000] font-medium hover:underline">
            Sign up
          </a>
        </p> */}
      </div>
    </main>
  )
}