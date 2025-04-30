"use client";

import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { useState } from 'react';
import { useEffect } from 'react';


export default function Dashboard() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [industry, setIndustry] = useState('');
const [country, setCountry] = useState('');
const [city, setCity] = useState('');
const [employeeRange, setEmployeeRange] = useState('');


useEffect(() => {
  // Fetch data on component mount
}, []);

const handleSearch = () => {
  fetch('/api/companies')
    .then((res) => res.json())     // Step 1: Get all company data
    .then((data) => {
      const filtered = data.filter((companies: { name?: string; website?: string; industry?: string; address?: { address?: string }; size?: string }) => {    // Step 2: Filter it

        // Individual filter checks
        const nameMatch = !companyName || companies.name?.toLowerCase().includes(companyName.toLowerCase());
        const websiteMatch = !website || companies.website?.toLowerCase().includes(website.toLowerCase());
        const industryMatch = !industry || companies.industry === industry;
        const countryMatch = !country || companies.address?.address?.toLowerCase().includes(country.toLowerCase());
        const cityMatch = !city || companies.address?.address?.toLowerCase().includes(city.toLowerCase());
        const employeeMatch = !employeeRange || companies.size === employeeRange;

        // Only return company if it matches ALL selected filters
        return nameMatch && websiteMatch && industryMatch && countryMatch && cityMatch && employeeMatch;
      });

      setCompanies(filtered);   // Step 3: Show the filtered companies in the table
    });
};


  const router = useRouter(); // Use the useRouter hook here
// Inside your component

const [emails, setEmail] = useState('');  // Add this line
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

  const [showExportOptions, setShowExportOptions] = useState(false);

  const handleExportCSV = () => {
    console.log("Export as CSV clicked");
    // Your CSV export logic goes here
    setShowExportOptions(false);
  };

  const [imageFile, setImageFile] = useState<File | null>(null);
const [formData, setFormData] = useState({ image: '' }); // Extend this if needed

const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files[0]) {
    setImageFile(event.target.files[0]);
    setFormData({ ...formData, image: URL.createObjectURL(event.target.files[0]) });
  }
};

  const handleExportExcel = () => {
    console.log("Export as Excel clicked");
    // Your Excel export logic goes here
    setShowExportOptions(false);
  };

  const [companyName, setCompanyName] = useState('');
  const [isCompanyFocused, setIsCompanyFocused] = useState(false);

  const [website, setWebsite] = useState('');
  const [isWebsiteFocused, setIsWebsiteFocused] = useState(false);

  // States for the modal dialog
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const rows = [
    { name: "Muhammad Nooh", address: "New York, USA", department: "Finance", phones: "+1 747 363 4567", emails: "info@thestra..." },
    { name: "Muhammad Nooh", address: "Paris, France", department: "Software dev", phones: "+1 747 363 4567", emails: "info@thestra..." },
    { name: "Muhammad Nooh", address: "Rome, Italy", department: "Accounts", phones: "+1 747 363 4567", emails: "info@thestra..." },
    { name: "Muhammad Nooh", address: "Paris, France", department: "Accounts", phones: "+1 747 363 4567", emails: "info@thestra..." },
    { name: "Muhammad Nooh", address: "Paris, France", department: "Software dev", phones: "+1 747 363 4567", emails: "info@thestra..." },
    { name: "Muhammad Nooh", address: "Paris, France", department: "Finance", phones: "+1 747 363 4567", emails: "info@thestra..." },
    { name: "Muhammad Nooh", address: "Paris, France", department: "Finance", phones: "+1 747 363 4567", emails: "info@thestra..." },
    { name: "Muhammad Nooh", address: "Paris, France", department: "Finance", phones: "+1 747 363 4567", emails: "info@thestra..." },
    { name: "Muhammad Nooh", address: "Paris, France", department: "Finance", phones: "+1 747 363 4567", emails: "info@thestra..." },
    { name: "Muhammad Nooh", address: "Paris, France", department: "Finance", phones: "+1 747 363 4567", emails: "info@thestra..." },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProfile = () => {
    console.log("Profile updated:", { firstName, lastName });
    closeModal(); // Close the modal after saving
  };

  return (
    <div className="flex min-h-screen rounded-lg bg-white border border-[#3F54D1]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#F2F2F2] rounded-2xl py-6 px-4 flex flex-col ml-4 mt-6 mb-8 mr-[-16]">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-4">
          <img src="/logo.png" alt="Logo" className="w-22 h-10" />
        </div>

        <div className="flex items-center space-x-3 mb-12 ml-[-12] mt-[22]">
          <div className="flex flex-col items-center">
            <img
              src="/profile.png"
              alt="Profile"
              className="w-[80px] h-[80px] rounded-full"
            />
            <button
              className="text-sm text-[#000000] ml-3 mt-2 hover:underline"
              onClick={openModal} // Open the modal when clicked
            >
              <u>Edit Profile</u>
            </button>
          </div>
          <div className="flex flex-col ml-[-10] mt-[-22]">
            <span className="text-xl font-semibold text-black leading-tight">Ferhet Kose</span>
            <span className="text-sm text-gray-500 leading-tight">Admin</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-6 text-[#808080] text-sm">
            <li className="flex items-center space-x-3 cursor-pointer group hover:text-[#3F54D1] mt-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-layout-dashboard-icon lucide-layout-dashboard"
              >
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
              <span>Dashboard</span>
            </li>

            <li
              className="flex items-center space-x-3 cursor-pointer group hover:text-[#3F54D1]"
              onClick={() => router.push('statistics')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chart-column-big-icon lucide-chart-column-big"
              >
                <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                <rect x="15" y="5" width="4" height="12" rx="1" />
                <rect x="7" y="8" width="4" height="9" rx="1" />
              </svg>
              <span>Statistics</span>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <button
          className="flex items-center space-x-2 mt-10 text-[#808080] text-sm group hover:text-[#3F54D1]"
          onClick={() => router.push('/')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-log-out-icon lucide-log-out"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          <span>Log out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 mt-[-14]">
        <section className="bg-[#F2F2F2] p-6 rounded-lg">
          <h2 className="text-[#3F54D1] text-2xl font-semibold mb-6">Search</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-[000000]">Company Name</label>
              <input
                type="text"
                placeholder={isCompanyFocused || companyName ? '' : 'Company name'}
                className="border border-gray-300 p-2 rounded-md w-full placeholder:text-sm placeholder-gray-400"
                value={companyName}
                onFocus={() => setIsCompanyFocused(true)}
                onBlur={() => setIsCompanyFocused(false)}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-[#000000]">Industry</label>
              <select
  value={industry}
  onChange={(e) => setIndustry(e.target.value)}
  className="appearance-none border border-gray-300 rounded-md w-full text-gray-500 text-sm pl-3 pr-2 h-10.5 leading-10 bg-gray"
                aria-label="Industry"
              >
                <option value="">Select Industry</option>
<option value="IT">IT</option>
<option value="Automotive">Automotive</option>

              </select>
              {/* Custom SVG arrow aligned with text */}
              <div className="absolute left-70 top-[47] transform -translate-y-1/2 pointer-events-none flex items-center h-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-[#000000]">Country</label>
              <select
                className="appearance-none border border-gray-300 rounded-md w-full text-gray-500 text-sm pl-3 pr-2 h-10.5 leading-10 bg-gray"
                aria-label="Country selection"
              >
                <option>Select country</option>
              </select>
              {/* Custom SVG arrow aligned with text */}
              <div className="absolute left-70 top-[47] transform -translate-y-1/2 pointer-events-none flex items-center h-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-[#000000]">City/State</label>
              <select aria-label="City/State selection" className="appearance-none border border-gray-300 rounded-md w-full text-gray-500 text-sm pl-3 pr-2 h-10.5 leading-10 bg-gray">
                <option>Select city/state</option>
              </select>
              {/* Custom SVG arrow aligned with text */}
              <div className="absolute left-70 top-[47] transform -translate-y-1/2 pointer-events-none flex items-center h-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-[#000000]">Employee Range</label>
              <select
                className="appearance-none border border-gray-300 rounded-md w-full text-gray-500 text-sm pl-3 pr-2 h-10.5 leading-10 bg-gray"
                title="Employee Range"
              >
                <option>Select range</option>
              </select>
              {/* Custom SVG arrow aligned with text */}
              <div className="absolute left-70 top-[47] transform -translate-y-1/2 pointer-events-none flex items-center h-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-[000000]">Website</label>
              <input
                type="text"
                placeholder={isWebsiteFocused || website ? '' : 'Enter website'}
                className="border border-gray-300 p-2 rounded-md w-full placeholder:text-sm placeholder-gray-400"
                value={website}
                onFocus={() => setIsWebsiteFocused(true)}
                onBlur={() => setIsWebsiteFocused(false)}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>

          <button
  onClick={handleSearch}
  className="bg-[#000000] text-white px-6 py-2 rounded-md mt-4 hover:bg-[#3F54D1]"
>
  Search
</button>

        </section>

        <section className="bg-[#F2F2F2] p-6 rounded-lg mt-6 mb-[-10]">
          <h2 className="text-[#3F54D1] text-2xl font-semibold mb-6">Results</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="bg-[#E2E2E2] text-[000000]">
                <tr>
                  <th className="px-4 py-2 font-medium border-l border-gray-300 whitespace-nowrap">Company name</th>
                  <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">address</th>
                  <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">Industry</th>
                  <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">Phone</th>
                  <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">emails</th>
                  <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">Website</th>
                  <th className="px-4 py-2 font-medium whitespace-nowrap">Key people</th>
                </tr>
              </thead>
              <tbody>
              {companies.map((company, idx) => (
  <tr key={idx} className="border-t border-b border-gray-300 text-[#565656]">
  <td className="px-4 py-2 border-l border-r border-gray-200 whitespace-nowrap">
    {company.name}
  </td>
  <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">
    {company.address?.address || "-"}
  </td>
  <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">
    {company.industry || "-"}
  </td>
  <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">
    {company.phones?.phone || "-"}
  </td>
  <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">
    {company.emails?.email || "-"}
  </td>
  <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">
    {company.website || "-"}
  </td>
  <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">
    {company.management?.CEO || "-"}
  </td>
</tr>

))}
              </tbody>
            </table>
          </div>

          {/* Export Dropdown */}
          <div className="relative inline-block mt-6">
            <button
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="bg-[#000000] text-white px-6 py-2 rounded-md hover:bg-[#3F54D1] flex items-center"
            >
              Export
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {showExportOptions && (
              <div className="absolute mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
                <button
                  onClick={handleExportCSV}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Export as CSV
                </button>
                <button
                  onClick={handleExportExcel}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Export as Excel
                </button>
              </div>
            )}
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
      {/* Header with Title and Profile Picture */}
      <div className="flex justify-between items-start mb-4 ml-10 mt-[-18]">
        <h2 className="text-4xl font-semibold text-[#3F54D1] mt-8">Edit Profile</h2>

        {/* Profile Picture with Upload Logic */}
        <div className="flex flex-col items-center">
          <img
            src={formData.image || "/profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
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
            className="text-sm text-[#000000] mt-2 hover:underline cursor-pointer"
          >
            Change Picture
          </label>
        </div>
      </div>

      {/* First and Last Name */}
      <div className="flex gap-12 mr-25 ml-10">
        <div className="w-1/2">
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      {/* emails */}
      <div className='ml-10 mr-25 mt-8'>
        <label className="block text-sm font-medium mt-5">emails</label>
        <input
          type="emails"
          className="w-full border border-gray-300 p-2 rounded-md"
          value={emails}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className='ml-10 mr-25 mt-8'>
        <label className="block text-sm font-medium mt-5">Password</label>
        <input
          type="password"
          className="w-full border border-gray-300 p-2 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Confirm Password */}
      <div className='ml-10 mr-25 mt-8'>
        <label className="block text-sm font-medium mt-5">Confirm Password</label>
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
          className="flex-1 bg-white border text-black py-3 rounded-md text-sm hover:bg-[#3F54D1]"
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

{isDialogOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="relative bg-white rounded-xl p-6 shadow-lg w-[90vw] max-w-[1200px] max-h-[90vh] overflow-y-auto">
      {/* Close Icon Button */}
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        onClick={() => setIsDialogOpen(false)}
      >
        &times;
      </button>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-[30%] bg-[#F2F2F2] rounded-2xl py-6 px-4 flex flex-col mt-7 ml-5">
          <h2 className="text-[#3F54D1] text-2xl font-semibold mb-6">Company Overview</h2>
          <p className="text-[#808080]">
            Explore agricultural, construction, forestry machinery, technology, services and more on 
            the official John Deere website. Find a dealer in your area or purchase online. It doesn't 
            matter if you've never driven a tractor, mowed a lawn, or operated a dozer. With John Deere's 
            role in helping produce food, fiber, fuel, and more, you’re in good hands..
            &nbsp;&nbsp;&nbsp;<u>Show more</u>
          </p>

          {/* Company Details */}
          <div className="grid grid-cols-2 gap-4 mt-14">
            <div className="text-[#636363]">
              <p className="mb-6">Phone</p>
              <p className="mb-6">Market Cap</p>
              <p className="mb-6">Annual Revenue</p>
              <p className="mb-6">Industry</p>
              <p className="mb-6">Founding Year</p>
              <p className="mb-6">Industry</p>
            </div>
            <div className="text-[#000000]">
              <p className="mb-6">(309)-765-8000</p>
              <p className="mb-6">$134M</p>
              <p className="mb-6">$23M</p>
              <p className="mb-6">2003</p>
              <p className="mb-6">Agriculture</p>
              <p className="mb-3 w-25 px-3 py-1 rounded-sm text-xs font-medium bg-[#CFCFCF] text-[#000000]">
                construction
              </p>
              <p className="mb-6 w-25 px-3 py-1 rounded-sm text-xs font-medium bg-[#CFCFCF] text-[#000000]">
                machinery
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
<main className="flex-1 p-4 bg-[#F2F2F2] rounded-2xl mt-7 ml-5 mr-5 max-h-[520px] overflow-y-auto">
  <h2 className="text-[#3F54D1] text-2xl font-semibold mb-6">Prospects</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm text-left border-collapse">
      <thead className="bg-[#E2E2E2] text-[#000000]">
        <tr>
          <th className="px-4 py-2 font-medium border-l border-gray-300 whitespace-nowrap">Name</th>
          <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">address</th>
          <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">Department</th>
          <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">Phone</th>
          <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">emails</th>              
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} className="border-t border-b border-gray-300 text-[#565656]">
            <td className="px-4 py-2 border-l border-r border-gray-200 whitespace-nowrap">{row.name}</td>
            <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">{row.address}</td>
            <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">{row.department}</td>
            <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">{row.phones}</td>
            <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">{row.emails}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</main>

      </div>
    </div>
  </div>
)}


    </div>
  );
}