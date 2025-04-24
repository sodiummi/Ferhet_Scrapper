"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function PasswordOnlyLogin() {
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [errors, setErrors] = useState({
    password: '',
    rePassword: ''
  })
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setErrors({ password: '', rePassword: '' })

    let isValid = true
    let newErrors = { password: '', rePassword: '' }

    if (!password) {
      newErrors.password = 'Password is required.'
      isValid = false
    }

    if (!rePassword) {
      newErrors.rePassword = 'Please re-enter the password.'
      isValid = false
    } else if (password !== rePassword) {
      newErrors.rePassword = 'Passwords do not match.'
      isValid = false
    }

    setErrors(newErrors)

    if (isValid) {
      setShowSuccessDialog(true)
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: '' }))
    }
  }

  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value)
    if (errors.rePassword) {
      setErrors((prev) => ({ ...prev, rePassword: '' }))
    }
  }

  // ✅ Manual redirect on click
  const handleBackToLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push('/')
  }

  if (showSuccessDialog) {
    return (
      <div className="min-h-screen flex items-center justify-center relative 
      font-sans overflow-hidden bg-white px-8">
        <div
          className="w-full max-w-md bg-white rounded-xl shadow-sm border border-[#3F54D1] p-8 text-center"
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="mb-6 flex flex-col items-center">
            <div className="absolute top-34 left-1/2 transform -translate-x-1/2 w-70 h-32 bg-gradient-to-br from-[#dbe4ff] to-white rounded-full blur-2xl z-0" />
            <Image src="/logo.png" alt="Logo" width={150} height={150} className="relative z-10" />
            <h1 className="text-4xl font-semibold text-[#3F54D1] mt-10">
              Password has been<br />
              reset successfully.
            </h1>
            <p className="text-sm text-[#808080] mt-12">
              You can now log in with your new password.
            </p>
            <p className="text-sm text-[#808080] mt-3">
              <a
                href="/"
                onClick={handleBackToLogin}
                className="text-[#000000] font-medium hover:underline"
              >
                Back to login
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative 
    font-sans overflow-hidden bg-white px-8">
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-sm border border-[#3F54D1] p-8 text-center relative"
        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 
          w-[60vw] max-w-md h-[25vh] bg-gradient-to-br from-[#dbe4ff] to-white 
          rounded-b-full blur-2xl z-0 md:w-[40vw] md:h-[20vh] lg:w-[30vw] lg:h-[18vh]" />

        <div className="mb-6 flex flex-col items-center relative z-10">
          <Image src="/logo.png" alt="Logo" width={150} height={150} />
          <h1 className="text-4xl font-semibold text-[#3F54D1] mt-10">
            Reset Password
          </h1>
          <p className="text-sm text-[#808080] mt-1">
            Please set your new password
          </p>
        </div>

        <form className="text-left space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-black block mb-1 mt-10">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2e2eff]"
                value={password}
                onChange={handlePasswordChange}
              />
              {errors.password && (
                <p className="text-red-500 text-[10px] mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-black block mb-1 mt-10">
              Re-enter Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2e2eff]"
                value={rePassword}
                onChange={handleRePasswordChange}
              />
              {errors.rePassword && (
                <p className="text-red-500 text-[10px] mt-1">{errors.rePassword}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#000000] text-white py-2 rounded-md text-sm hover:bg-[#3F54D1] mt-7 mb-4"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  )
}