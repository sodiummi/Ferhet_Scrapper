"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({ email: '' })
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [isEmailFocused, setIsEmailFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setErrors({ email: '' })
    let isValid = true
    let newErrors = { email: '' }

    if (!email) {
      newErrors.email = 'Email is required.'
      isValid = false
    }

    setErrors(newErrors)

    if (isValid) {
      console.log('Form Submitted:', { email })
      setIsDialogVisible(true)

      setTimeout(() => {
        router.push('/resetpassword')
      }, 3000) // 3 seconds delay
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (errors.email) {
      setErrors({ email: '' })
    }
  }

  // Show dialog box if submitted successfully
  if (isDialogVisible) {
    return (
      <div className="min-h-screen flex items-center justify-center relative font-sans overflow-hidden bg-white px-8">
        <div
          className="w-full max-w-md bg-white rounded-xl shadow-sm border border-[#3F54D1] p-8 text-center"
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="mb-6 flex flex-col items-center">
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-70 h-32 bg-gradient-to-br from-[#dbe4ff] to-white rounded-full blur-2xl z-0" />
            <Image src="/logo.png" alt="Logo" width={150} height={150} className="relative z-10" />
            <h1 className="text-4xl font-semibold text-[#3F54D1] mt-10">
              Password Reset<br />
              Email Sent
            </h1>
            <p className="text-sm text-[#808080] mt-12">
              We've sent a password reset link to your email.
              Please check your inbox and follow the instructions to set a new password.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Main form UI
  return (
    <div className="min-h-screen flex items-center justify-center relative font-sans overflow-hidden bg-white px-8">
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-sm border border-[#3F54D1] p-8 text-center"
        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="mb-6 flex flex-col items-center">
          <div className="absolute top-23 left-1/2 transform -translate-x-1/2 w-70 h-31 bg-gradient-to-br from-[#dbe4ff] to-white rounded-full blur-2xl z-0" />
          <Image src="/logo.png" alt="Logo" width={150} height={150} className="relative z-10" />
          <h1 className="text-4xl font-semibold text-[#3F54D1] mt-10">
            Forgot Password?
          </h1>
          <p className="text-sm text-[#808080] mt-1">
            Please enter your email so that we can send you password reset link
          </p>
        </div>

        <form className="text-left space-y-5 mt-9" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-[#000000] block mb-1">
              Email Address
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

          <button
            type="submit"
            className="w-full bg-[#000000] text-white py-2 rounded-md text-sm hover:bg-[#3F54D1] mt-5"
          >
            Send Email
          </button>
        </form>

        <p className="text-sm text-[#808080] mt-3">
          <a href="/" className="text-[#000000] font-medium hover:underline">
            Back to login
          </a>
        </p>
      </div>
    </div>
  )
}