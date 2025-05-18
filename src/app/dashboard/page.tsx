"use client";

import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { useState, useEffect } from 'react';

export default function Dashboard() {
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
  const [companies, setCompanies] = useState<any[]>([]);
  const [industry, setIndustry] = useState('');
const [country, setCountry] = useState('');
const [city, setCity] = useState('');
const [employeeRange, setEmployeeRange] = useState('');

  // State for handling pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Adjust this based on your actual data

  // State for handling selected detail
const [selectedId, setSelectedId] = useState<string | null>(null);
const [selectedCompany, setSelectedCompany] = useState<any>(null);


useEffect(() => {
  // Fetch data on component mount
  fetch('/api/companies')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (data && Array.isArray(data)) {
        setCompanies(data);
      } else {
        console.warn('Received non-array data from API:', data);
        setCompanies([]);
      }
    })
    .catch(error => {
      console.error('Error fetching initial data:', error);
      setCompanies([]);
    });
}, []);

const handleSearch = () => {
  fetch('/api/companies')
    .then((res) => res.json())     // Step 1: Get all company data
    .then((data) => {
      // Handle case when data is null or undefined
      if (!data) {
        console.error('No data received from API');
        setCompanies([]);
        return;
      }
      
      const filtered = data.filter((companies: { name?: string; website?: string; industry?: string; address?: { address?: string }; size?: string; country?: string; }) => {    // Step 2: Filter it

        // Individual filter checks
        const nameMatch = !companyName || companies.name?.toLowerCase().includes(companyName.toLowerCase());
        const websiteMatch = !website || companies.website?.toLowerCase().includes(website.toLowerCase());
        const industryMatch = !industry || companies.industry === industry;
        const countryMatch = !country || companies.country === country;
        const cityMatch = !city || companies.address?.address?.toLowerCase().includes(city.toLowerCase());
        const employeeMatch = !employeeRange || companies.size === employeeRange;

        // Only return company if it matches ALL selected filters
        return nameMatch && websiteMatch && industryMatch && countryMatch && cityMatch && employeeMatch;
      });

      setCompanies(filtered);   // Step 3: Show the filtered companies in the table
    })
    .catch(error => {
      console.error('Error fetching companies:', error);
      setCompanies([]);
    });
};


  const router = useRouter(); // Use the useRouter hook here
// Inside your component

const [emails, setEmail] = useState('');  // Add this line
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

  const [showExportOptions, setShowExportOptions] = useState(false);

  const handleExportCSV = () => {
  if (!companies || companies.length === 0) {
    alert('No company data to export.');
    return;
  }

  const headers = ['Company Name', 'Location', 'Industry', 'Phone', 'Website'];
  
  const csvRows = [
    headers.join(','), // header row
    ...companies.map((company) => {
      const row = [
        company.name || '',
        company.address || '',
        company.industry || '',
        company.phones || '',
        company.website || '',
      ];
      return row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',');
    })
  ];

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'companies.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

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


  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Navigate to the new page based on pageNumber
    router.push(`/dashboard?page=${pageNumber}`);
  };


// Handle navigation to detail page
const handleGoToDetail = (id: string) => {
  setSelectedId(id); // update state
  router.push(`/details/${id}`); // navigate
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

  const allProspectRows = [
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
    { name: "John Doe", address: "London, UK", department: "Marketing", phones: "+44 123 456 7890", emails: "john@example..." },
    { name: "Jane Smith", address: "Berlin, Germany", department: "HR", phones: "+49 987 654 3210", emails: "jane@example..." },
    { name: "Robert Johnson", address: "Tokyo, Japan", department: "R&D", phones: "+81 345 678 9012", emails: "robert@example..." },
    { name: "Emily Davis", address: "Sydney, Australia", department: "Sales", phones: "+61 234 567 8901", emails: "emily@example..." },
    { name: "Michael Brown", address: "Toronto, Canada", department: "Legal", phones: "+1 456 789 0123", emails: "michael@example..." },
    { name: "Sarah Wilson", address: "Madrid, Spain", department: "Operations", phones: "+34 567 890 1234", emails: "sarah@example..." },
    { name: "David Lee", address: "Seoul, South Korea", department: "IT", phones: "+82 678 901 2345", emails: "david@example..." },
    { name: "Lisa Wang", address: "Beijing, China", department: "Finance", phones: "+86 789 012 3456", emails: "lisa@example..." },
    { name: "James Miller", address: "Moscow, Russia", department: "Engineering", phones: "+7 890 123 4567", emails: "james@example..." },
    { name: "Anna Garcia", address: "São Paulo, Brazil", department: "Product", phones: "+55 901 234 5678", emails: "anna@example..." }
  ];
  
  // State for Prospects pagination
  const [prospectCurrentPage, setProspectCurrentPage] = useState(1);
  const prospectItemsPerPage = 5; // Number of items to show per page
  const prospectTotalPages = Math.ceil(allProspectRows.length / prospectItemsPerPage);
  
  // Get current rows for Prospects table based on pagination
  const indexOfLastProspect = prospectCurrentPage * prospectItemsPerPage;
  const indexOfFirstProspect = indexOfLastProspect - prospectItemsPerPage;
  const currentProspectRows = allProspectRows.slice(indexOfFirstProspect, indexOfLastProspect);

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
          className="flex items-center space-x-2 mt-30 text-[#808080] text-sm group hover:text-[#3F54D1]"
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
        <main className="flex-1 bg-white px-4 py-6 sm:px-6 md:px-10 md:ml-0 w-full">
          {/* Search Section */}
          <section className="bg-[#F2F2F2] p-4 sm:p-6 rounded-lg mb-6">
            <h2 className="text-[#3F54D1] text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Search</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-[#000000]">Company Name</label>
                <input
                  type="text"
                  placeholder={isCompanyFocused || companyName ? '' : 'Company name'}
                  className="border border-gray-300 p-2 rounded-md w-full placeholder:text-sm placeholder-gray-400 text-[#000000]"
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
  className="appearance-none border border-gray-300 rounded-md w-full text-gray-500 text-sm pl-3 pr-8 h-10 leading-10 bg-gray"
  aria-label="Industry"
>
  <option value="">Select Industry</option>
  <option value="information technology & services">Information Technology & Services</option>
  <option value="construction">Construction</option>
  <option value="marketing & advertising">Marketing & Advertising</option>
  <option value="real estate">Real Estate</option>
  <option value="health, wellness & fitness">Health, Wellness & Fitness</option>
  <option value="management consulting">Management Consulting</option>
  <option value="computer software">Computer Software</option>
  <option value="internet">Internet</option>
  <option value="retail">Retail</option>
  <option value="financial services">Financial Services</option>
  <option value="consumer services">Consumer Services</option>
  <option value="hospital & health Care">Hospital & Health Care</option>
  <option value="automotive">Automotive</option>
  <option value="restaurants">Restaurants</option>
  <option value="education management">Education Management</option>
  <option value="food & beverages">Food & Beverages</option>
  <option value="design">Design</option>
  <option value="hospitality">Hospitality</option>
  <option value="accounting">Accounting</option>
  <option value="events services">Events Services</option>
</select>


                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center" style={{ top: '40%' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-[#000000]">Country</label>
                <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                  className="appearance-none border border-gray-300 rounded-md w-full text-gray-500 text-sm pl-3 pr-2 h-10.5 leading-10 bg-gray"
                  aria-label="Country selection"
                >
                  <option>Select country</option>
                  
  <option value="UK">UK</option>
  <option value="US">USA</option>
  <option value="Germany">Germany</option>
  <option value="Netherlands">Netherlands</option>
  <option value="India">India</option>
  <option value="Switzerland">Switzerland</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center" style={{ top: '40%' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-[#000000]">Region</label>
                <select aria-label="City/State selection" className="appearance-none border border-gray-300 rounded-md w-full text-gray-500 text-sm pl-3 pr-2 h-10.5 leading-10 bg-gray">
                  <option>Select Region</option>
                  <option value="">Central</option>
  <option value="">North</option>
  <option value="">South</option>

                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center" style={{ top: '40%' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-[#000000]">Revenue Range</label>
                <select
                  className="appearance-none border border-gray-300 rounded-md w-full text-gray-500 text-sm pl-3 pr-2 h-10.5 leading-10 bg-gray"
                  title="Employee Range"
                >
                  <option>Select range</option>
                  <option value="">Less than $1M</option>
  <option value="">$1M–$10M</option>
  <option value="">$10M–$50M</option>
  <option value="">$50M–$100M</option>
  <option value="">$100M–$250M</option>
  <option value="">$500M–$1B</option>
  <option value="">$1B–$5B</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center" style={{ top: '40%' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-[#000000]">Website</label>
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

            {/* <button
  onClick={handleSearch}
  className="bg-[#000000] text-white px-6 py-2 rounded-md mt-4 hover:bg-[#3F54D1]"
>
  Search
</button>

        </section> */}

<button
      onClick={handleSearch}
      className="bg-[#000000] text-white px-6 py-2 rounded-md hover:bg-[#3F54D1] transition"
    >
      Search
    </button>
  </section>

          {/* Results Section */}
          <section className="bg-[#F2F2F2] p-4 sm:p-6 rounded-lg">
            <h2 className="text-[#3F54D1] text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Results</h2>

            <div className="w-full overflow-x-auto">
              <table className="min-w-full text-sm text-left border-collapse">

                
              <thead className="bg-[#E2E2E2] text-[#000000]">
                <tr>
                  <th className="px-4 py-2 font-medium border-l border-gray-300 whitespace-nowrap">Company name</th>
                  <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">Location</th>
                  <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">Industry</th>
                  <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">Phone</th>
                  <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">Country</th>
                  <th className="px-4 py-2 font-medium border-gray-300 whitespace-nowrap">Website</th>
                  <th className="px-4 py-2 font-medium whitespace-nowrap">Key people</th>
                </tr>
              </thead>
              <tbody>
              {companies.map((company, idx) => (
  <tr key={idx} className="border-t border-b border-gray-300 text-[#565656]">
  <td 
  className="px-4 py-2 border-l border-r border-gray-200 whitespace-nowrap cursor-pointer hover:text-[#3F54D1]" 
  onClick={() => {
    setSelectedCompany(company);  // Set the selected company here
    setIsDialogOpen(true);
  }}
>
  {company.name}
</td>

  <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">
    {company.address || "-"}
  </td>
  <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">
    {company.industry || "-"}
  </td>
  <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">
    {company.phones || "-"}
  </td>
  <td className="px-4 py-2 border-r border-gray-200 whitespace-nowrap">
    {company.country || "-"}
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

          {/* Export Dropdown
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
                <path d="M6 9l6 6-6 6" />
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
          </div> */}

        {/* Export Dropdown */}
    <div className="relative inline-block mt-4 sm:mt-6">
      <button
        onClick={() => setShowExportOptions(!showExportOptions)}
        className="bg-[#000000] text-white px-6 py-2 rounded-md hover:bg-[#3F54D1] flex items-center"
      >
        Export
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 9l6 6-6 6" />
        </svg>
      </button>
      {showExportOptions && (
        <div className="absolute mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
          <button onClick={handleExportCSV} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 w-full text-left">
            Export as CSV
          </button>
          
        </div>
      )}
    </div>

    
          {/* Pagination Controls */}
{/* <div className="flex items-center space-x-2 ml-190 mt-[-40]">
<button className="w-8 h-8 bg-[#D9D9D9] border border-gray-300 rounded-md hover:bg-gray-200 flex items-center justify-center"
onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
>
  <svg
    className="w-full h-full"
    fill="#8B8B8B"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15 18l-6-6 6-6v12z" />
  </svg>
</button>
  <span className="text-sm text-[#8B8B8B]">1 2 3 4 5 ......... 10</span>
  <button className="w-8 h-8 bg-[#D9D9D9] border border-gray-300 rounded-md hover:bg-gray-200 flex items-center justify-center"
  onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
  >
  <svg
    className="w-full h-full"
    fill="#8B8B8B"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 6l6 6-6 6" />
  </svg>
</button>
</div>
   
        </section>
      </main> */}


 {/* Pagination Controls */}
<div className="flex justify-end items-center space-x-2 mt-6">
{/* <div className="flex justify-center md:justify-end items-center space-x-2 mt-6"> */}
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
    className="fixed inset-0 flex justify-center items-center z-20  bg-opacity-20"
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
          <label className="block text-[#000000] text-sm font-medium">First Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="w-1/2">
          <label className="block text-[#000000] text-sm font-medium">Last Name</label>
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
          type="emails"
          className="w-full border border-gray-300 p-2 rounded-md"
          value={emails}
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
        {selectedCompany && (
  <aside className="w-[30%] bg-[#F2F2F2] rounded-2xl py-6 px-4 flex flex-col mt-7 ml-5">
    <h2 className="text-[#3F54D1] text-2xl font-semibold mb-6">Company Overview</h2>
    <p className="text-[#808080] text-sm leading-relaxed">
  <span className="text-[#000000] font-medium">
    {selectedCompany.name || "This company"}
  </span>{" "}
  is a{" "}
  <span className="text-[#000000] font-medium">
    {selectedCompany.industry || "company"}
  </span>{" "}
  located at{" "}
  <span className="text-[#000000] font-medium">
    {selectedCompany.address || "an unknown location"}
  </span>
  . It can be contacted using{" "}
  <span className="text-[#000000] font-medium">
    {selectedCompany.phones || "N/A"}
  </span>
  , and the source data is{" "}
  <a
    href={
      selectedCompany.website?.startsWith("http")
        ? selectedCompany.website
        : `https://${selectedCompany.website}`
    }
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#3F54D1] underline font-medium"
  >
    {selectedCompany.website || "unavailable"}
  </a>
  .
  &nbsp;&nbsp;&nbsp;<u></u>
</p>


    {/* Company Details */}
   <div className="mt-6 grid gap-y-4">
  {/* Name */}
  <div className="grid grid-cols-2">
    <p className="text-[#636363]">Name</p>
    <p className="text-[#000000]">{selectedCompany.name || "-"}</p>
  </div>

  {/* Phone */}
  <div className="grid grid-cols-2">
    <p className="text-[#636363]">Phone</p>
    <p className="text-[#000000]">{selectedCompany.phones || "-"}</p>
  </div>

  {/* Location */}
  <div className="grid grid-cols-2">
    <p className="text-[#636363]">Location</p>
    <p className="text-[#000000]">{selectedCompany.address || "-"}</p>
  </div>

  {/* Website */}
  <div className="grid grid-cols-2">
    <p className="text-[#636363]">Website</p>
    <p className="text-[#3F54D1] underline break-all">
      {selectedCompany.website ? (
        <a
          href={
            selectedCompany.website.startsWith("http")
              ? selectedCompany.website
              : `https://${selectedCompany.website}`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {selectedCompany.website}
        </a>
      ) : (
        "-"
      )}
    </p>
  </div>

  {/* Industry */}
  <div className="grid grid-cols-2">
    <p className="text-[#636363]">Industry</p>
    <div>
      <span className="inline-block px-3 py-1 rounded-sm text-xs font-medium bg-[#CFCFCF] text-[#000000]">
        {selectedCompany.industry || "-"}
      </span>
    </div>
  </div>
</div>


  </aside>
)}

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
        {currentProspectRows.map((row, idx) => (
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
  {/* Pagination Controls */}
<div className="flex justify-end items-center space-x-2 mt-6">
  {/* Previous Button */}
  <button
    className="w-8 h-8 bg-[#D9D9D9] border border-gray-300 rounded-md hover:bg-gray-200 flex items-center justify-center"
    onClick={() => setProspectCurrentPage(prospectCurrentPage > 1 ? prospectCurrentPage - 1 : 1)}
  >
    <svg className="w-full h-full" fill="#8B8B8B" viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6v12z" />
    </svg>
  </button>

  {/* Pagination Numbers (as individual spans) */}
  <span className="text-sm text-[#8B8B8B] space-x-1">
    {Array.from({ length: prospectTotalPages }, (_, i) => i + 1).map((pageNum) => (
      <span
        key={pageNum}
        onClick={() => setProspectCurrentPage(pageNum)}
        className={`cursor-pointer hover:underline ${pageNum === prospectCurrentPage ? 'text-[#3F54D1] font-bold' : ''}`}
      >
        {pageNum}
      </span>
    ))}
  </span>

  {/* Next Button */}
  <button
    className="w-8 h-8 bg-[#D9D9D9] border border-gray-300 rounded-md hover:bg-gray-200 flex items-center justify-center"
    onClick={() => setProspectCurrentPage(prospectCurrentPage < prospectTotalPages ? prospectCurrentPage + 1 : prospectTotalPages)}
  >
    <svg className="w-full h-full" fill="#8B8B8B" viewBox="0 0 24 24">
      <path d="M10 6l6 6-6 6" />
    </svg>
  </button>
</div>

  </div>
</main>

      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}