"use client";

import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Statistics() {
  const router = useRouter();

  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // State for handling pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Adjust this based on your actual data

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ image: '' }); // Extend this if needed

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      setFormData({ ...formData, image: URL.createObjectURL(event.target.files[0]) });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSaveProfile = () => {
    console.log("Profile updated:", { firstName, lastName });
    closeModal();
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Navigate to the new page based on pageNumber
    router.push(`/statistics?page=${pageNumber}`);
  };

  return (
    <div className="min-h-screen rounded-lg bg-white shadow-6xl">
      {/* Mobile Top Bar - Only visible on mobile */}
      <div className="md:hidden flex items-center justify-between bg-[#F2F2F2] p-4">
        <button 
          onClick={toggleMobileMenu} 
          className="text-gray-700 focus:outline-none"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
        <img src="/logo.svg" alt="Logo" className="w-22 h-10" />
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Hidden on mobile unless menu is open */}
        <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block md:w-64 flex-shrink-0 bg-[#F2F2F2] rounded-2xl py-6 px-4 flex flex-col md:ml-4 md:mt-6 md:mb-8 z-10 absolute md:relative w-64 h-screen md:h-auto overflow-y-auto`}>
          {/* Logo - Hidden on mobile as it's in the top bar */}
          <div className="hidden md:flex items-center space-x-2 mb-4">
            <img src="/logo.png" alt="Logo" className="w-22 h-10" />
          </div>

          <div className="flex items-center space-x-3 mb-12 ml-[-12] mt-[22]">
            <div className="flex flex-col items-center">
              <img src="/profile.png" alt="Profile" className="w-[80px] h-[80px] rounded-full" />
              <button className="text-sm text-[#000000] ml-3 mt-2 hover:underline" onClick={openModal}>
                <u>Edit Profile</u>
              </button>
            </div>
            <div className="flex flex-col ml-[-10] mt-[-22]">
              <span className="text-xl font-semibold text-black leading-tight">Ferhet Kose</span>
              <span className="text-sm text-gray-500 leading-tight">Admin</span>
            </div>
          </div>

          <nav className="flex-1">
            <ul className="space-y-6 text-[#808080] text-sm">
              <li
                className="flex items-center space-x-3 cursor-pointer group hover:text-[#3F54D1] mt-7"
                onClick={() => router.push('dashboard')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="lucide lucide-layout-dashboard">
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
                <span>Dashboard</span>
              </li>
              <li className="flex items-center space-x-3 cursor-pointer group hover:text-[#3F54D1]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="lucide lucide-chart-column-big">
                  <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                  <rect x="15" y="5" width="4" height="12" rx="1" />
                  <rect x="7" y="8" width="4" height="9" rx="1" />
                </svg>
                <span>Statistics</span>
              </li>
            </ul>
          </nav>

          <button
          className="flex items-center space-x-2 mt-10 text-[#808080] text-sm group hover:text-[#3F54D1]"
          onClick={() => router.push('/')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          <span>Log out</span>
        </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white px-4 py-6 sm:px-6 md:px-10 md:ml-0 w-full">
          <section className="bg-[#F2F2F2] p-6 rounded-lg">
            <h2 className="text-[#3F54D1] text-2xl sm:text-3xl font-semibold mb-6">Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ["Companies scraped", "12,540"],
                ["Employees scraped", "28,340"],
                ["Active searches", "5"],
                ["Successful searches", "1,890"],
              ].map(([label, value], idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-lg text-[#808080] shadow-sm"
                >
                  <p className="text-sm sm:text-base">{label}</p>
                  <div className="text-3xl sm:text-4xl font-medium text-black mt-4">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-[#F2F2F2] p-6 rounded-lg mt-6 mb-[-10]">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-[#E2E2E2] text-black">
                  <tr>
                    <th className="px-4 py-2 font-medium border-l border-gray-300 whitespace-nowrap">Search ID</th>
                    <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">Status</th>
                    <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">Companies scraped</th>
                    <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">Employees scraped</th>
                    <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Completed", "Completed", "In Progress", "Completed", "In Progress",
                    "Completed", "In Progress", "Completed", "Completed", "Completed",
                    "Completed", "Completed"
                  ].map((status, idx) => (
                    <tr key={idx} className="border-t border-b border-gray-300 text-[#565656]">
                      <td className="px-4 py-2 border-l border-r border-gray-200 whitespace-nowrap">1012</td>
                      <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-sm text-xs font-normal ${status === "Completed" ? "bg-[#3F54D1] text-white" : "bg-[#CFCFCF] text-black"}`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">Technology</td>
                      <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">info@thestralis.com</td>
                      <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">Feb 23, 2024</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-end items-center space-x-2 mt-6">
              {/* Previous Button */}
              <button
                className="w-8 h-8 bg-[#D9D9D9] border border-gray-300 rounded-md hover:bg-gray-200 flex items-center justify-center"
                onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
              >
                <svg className="w-full h-full" fill="#8B8B8B" viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6v12z" />
                </svg>
              </button>

              {/* Pagination Numbers (as individual spans) */}
              <span className="text-sm text-[#8B8B8B] space-x-1">
                {['1', '2', '3', '4', '5', '.........', '10'].map((item, idx) =>
                  item === '.........' ? (
                    <span key={idx}>.........</span>
                  ) : (
                    <span
                      key={idx}
                      onClick={() => handlePageChange(Number(item))}
                      className="cursor-pointer hover:underline"
                    >
                      {item}
                    </span>
                  )
                )}
              </span>

              {/* Next Button */}
              <button
                className="w-8 h-8 bg-[#D9D9D9] border border-gray-300 rounded-md hover:bg-gray-200 flex items-center justify-center"
                onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
              >
                <svg className="w-full h-full" fill="#8B8B8B" viewBox="0 0 24 24">
                  <path d="M10 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </section>
        </main>

        {isModalOpen && (
          <div
            className="fixed inset-0 flex justify-center items-center z-20"
            onClick={closeModal}
          >
            <div
              className="bg-white p-6 rounded-lg w-[700px] h-[600] shadow-lg relative"  // Increased width here
              onClick={(e) => e.stopPropagation()}
            >

              {/* Close Button (Top-Right) */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl font-bold focus:outline-none"
                onClick={closeModal}
              >
                &times;
              </button>

              {/* Header with Title and Profile Picture */}
              <div className="flex justify-between items-start mb-4 ml-6 mt-[-18]">
                <h2 className="text-4xl font-semibold text-[#3F54D1] mt-8">Edit Profile</h2>

                {/* Profile Picture with Upload Logic */}
                <div className="flex flex-col items-center">
                  <img
                    src={formData.image || "/profile.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover mt-4 mr-5"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="profile-image-upload"
                    onChange={handleImageChange}
                    className="hidden"
                    title="Upload profile image"
                    placeholder="Choose a file"
                  />
                  <label
                    htmlFor="profile-image-upload"
                    className="text-sm text-[#000000] mt-2 hover:underline cursor-pointer mr-5"
                  >
                    Change Picture
                  </label>
                </div>
              </div>

              {/* First and Last Name */}
              <div className="flex gap-12 mr-25 ml-6">
                <div className="w-1/2">
                  <label className="block text-sm text-[#000000] font-medium">First Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm text-[#000000] font-medium">Last Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              {/* emails */}
              <div className='ml-6 mr-25 mt-8'>
                <label className="block text-sm text-[#000000] font-medium mt-5">Email Address</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className='ml-6 mr-25 mt-8'>
                <label className="block text-sm text-[#000000] font-medium mt-5">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password */}
              <div className='ml-6 mr-25 mt-8'>
                <label className="block text-sm text-[#000000] font-medium mt-5">Confirm Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-6 ml-10 mr-80 mt-8">
                <button
                  type="button"
                  className="flex-1 bg-white border text-black py-3 rounded-md text-sm hover:bg-[#000000] hover:text-white"
                  onClick={closeModal}  // Close the modal
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 rounded-md text-sm hover:bg-[#3F54D1]"
                  onClick={() => {
                    handleSaveProfile();  // Save the profile
                    closeModal();         // Close the modal
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}