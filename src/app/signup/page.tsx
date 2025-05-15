"use client"; // Add this to mark this as a client-side component

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


export default function Signup() {
  const router = useRouter()

  // State to manage form input values
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Reset errors
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    // Validate fields
    let isValid = true
    let newErrors = { ...errors }

    if (!firstName) {
      newErrors.firstName = 'First Name is required.'
      isValid = false
    }

    if (!lastName) {
      newErrors.lastName = 'Last Name is required.'
      isValid = false
    }

    if (!email) {
      newErrors.email = 'Email is required.'
      isValid = false
    }

    if (!password) {
      newErrors.password = 'Password is required.'
      isValid = false
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.'
      isValid = false
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.'
      isValid = false
    } 

    setErrors(newErrors)

    // If form is valid, proceed with the signup logic (e.g., API call)
    if (isValid) {
      console.log('Form Submitted:', { firstName, lastName, email, password })

      router.push('/')
    }
  }

  // Handle input changes and clear error messages when user starts typing
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
    if (errors.firstName) {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: '' }))
    }
  }

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
    if (errors.lastName) {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: '' }))
    }
  }

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

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
    if (errors.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }))
    }
  }  

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 bg-white font-sans">
  <div
    className="w-full max-w-md bg-white rounded-xl shadow-sm border border-[#3F54D1] 
    p-8 text-center"
    style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
  >


        <div className="mb-6 flex flex-col items-center">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 
  w-[60vw] max-w-md h-[25vh] bg-gradient-to-br from-[#dbe4ff] to-white 
  rounded-b-full blur-2xl z-0 md:w-[40vw] md:h-[20vh] lg:w-[30vw] lg:h-[18vh]" />

          <Image src="/logo.png" alt="Logo" width={150} height={150} className="relative z-10" />
          <h1 className="text-5xl font-semibold text-[#3F54D1] mt-10">
            Welcome
          </h1>
          <p className="text-sm text-[#808080] mt-1">
            Please enter your details to sign up
          </p>
        </div>

        <form className="text-left space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="w-full sm:w-1/2">
              <label className="text-sm font-medium text-[#000000] block mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2e2eff]"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              {errors.firstName && <p className="text-red-500 text-[10px] mt-1">{errors.firstName}</p>}
            </div>

            <div className="w-full sm:w-1/2">
              <label className="text-sm font-medium text-[#000000] block mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2e2eff]"
                value={lastName}
                onChange={handleLastNameChange}
              />
              {errors.lastName && <p className="text-red-500 text-[10px] mt-1">{errors.lastName}</p>}
            </div>
          </div>

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

          <div>
            <label className="text-sm font-medium text-[#000000] block mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2e2eff]"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {errors.confirmPassword && <p className="text-red-500 text-[10px] mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>


          <button
            type="submit"
            className="w-full bg-[#000000] text-white py-2 rounded-md text-sm hover:bg-[#3F54D1] mt-4"
          >
            Sign up
          </button>
        </form>

        <p className="text-sm text-[#808080] mt-6">
          Already have an account?{' '}
          <a href="/" className="text-[#000000] font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}