import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  ChartBarIcon, 
  ClipboardDocumentListIcon, 
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserGroupIcon,
  PhoneIcon,
  UserIcon,
  ClipboardDocumentCheckIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function Dashboard({ onLogout }) {
  const [data, setData] = useState({ requests: [], donors: [], donatedDonors: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
   
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/dashboard`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error.response || error);
      setError(`Failed to fetch dashboard data: ${error.response?.data?.message || error.message}`);
      setLoading(false);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/login');
  };

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      await axios.put(`${import.meta.env.REACT_APP_API_URL}/api/requests/${requestId}`, 
        { status: newStatus },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      setData(prevData => ({
        ...prevData,
        requests: prevData.requests.map(request => 
          request._id === requestId ? { ...request, status: newStatus } : request
        )
      }));
    } catch (error) {
      console.error('Failed to update request status:', error.response || error);
      alert(`Failed to update status: ${error.response?.data?.message || error.message}`);
    }
  };

  const moveToDonated = async (donorId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/donors/${donorId}/donate`, 
        {},
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      setData(prevData => ({
        ...prevData,
        donors: prevData.donors.filter(donor => donor._id !== donorId),
        donatedDonors: [...prevData.donatedDonors, response.data]
      }));
    } catch (error) {
      console.error('Failed to move donor to donated:', error.response || error);
      alert(`Failed to move donor: ${error.response?.data?.message || error.message}`);
    }
  };

  const moveToActive = async (donorId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/donors/${donorId}/activate`, 
        {},
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      setData(prevData => ({
        ...prevData,
        donatedDonors: prevData.donatedDonors.filter(donor => donor._id !== donorId),
        donors: [...prevData.donors, response.data]
      }));
    } catch (error) {
      console.error('Failed to move donor to active:', error.response || error);
      alert(`Failed to move donor: ${error.response?.data?.message || error.message}`);
    }
  };

  const canMoveToActive = (donationDate) => {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    return new Date(donationDate) <= twoMonthsAgo;
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className="text-red-500 mb-4">{error}</p>
      <button 
        onClick={fetchData} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Retry
      </button>
    </div>
  );

  const requestStatusData = [
    { name: 'Pending', value: data.requests.filter(r => r.status === 'pending').length },
    { name: 'Completed', value: data.requests.filter(r => r.status === 'completed').length },
    { name: 'Cancelled', value: data.requests.filter(r => r.status === 'cancelled').length },
  ];

  const donorGenderData = [
    { name: 'Male', value: data.donors.filter(d => d.gender === 'male').length },
    { name: 'Female', value: data.donors.filter(d => d.gender === 'female').length },
  ];

  const bloodGroupData = [
    { name: 'A+', value: data.donors.filter(d => d.bloodType === 'A+').length },
    { name: 'A-', value: data.donors.filter(d => d.bloodType === 'A-').length },
    { name: 'B+', value: data.donors.filter(d => d.bloodType === 'B+').length },
    { name: 'B-', value: data.donors.filter(d => d.bloodType === 'B-').length },
    { name: 'AB+', value: data.donors.filter(d => d.bloodType === 'AB+').length },
    { name: 'AB-', value: data.donors.filter(d => d.bloodType === 'AB-').length },
    { name: 'O+', value: data.donors.filter(d => d.bloodType === 'O+').length },
    { name: 'O-', value: data.donors.filter(d => d.bloodType === 'O-').length },
  ];

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <div className={`bg-white shadow-md w-64 fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}>
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800">Blood Bridge</h1>
        </div>
        <nav className="mt-6">
          <a
            className={`flex items-center py-3 px-6 ${activeTab === 'overview' ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-red-50'}`}
            href="#"
            onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }}
          >
            <ChartBarIcon className="h-5 w-5 mr-3" />
            Overview
          </a>
          <a
            className={`flex items-center py-3 px-6 ${activeTab === 'donors' ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-red-50'}`}
            href="#"
            onClick={() => { setActiveTab('donors'); setSidebarOpen(false); }}
          >
            <UserGroupIcon className="h-5 w-5 mr-3" />
            Donors
          </a>
          <a
            className={`flex items-center py-3 px-6 ${activeTab === 'donated' ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-red-50'}`}
            href="#"
            onClick={() => { setActiveTab('donated'); setSidebarOpen(false); }}
          >
            <CheckCircleIcon className="h-5 w-5 mr-3" />
            Donated
          </a>
          <a
            className={`flex items-center py-3 px-6 ${activeTab === 'requests' ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-red-50'}`}
            href="#"
            onClick={() => { setActiveTab('requests'); setSidebarOpen(false); }}
          >
            <ClipboardDocumentListIcon className="h-5 w-5 mr-3" />
            Requests
          </a>
        </nav>
        <div className="absolute bottom-0 w-full p-6">
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-red-500"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 focus:outline-none focus:text-gray-700">
            {sidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Blood Bridge</h1>
          <div className="w-6"></div> {/* Placeholder for alignment */}
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-semibold mb-12">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6  rounded-lg shadow-md flex items-center">
                  <div className="bg-red-100 p-3 rounded-full">
                    <UserIcon className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-semibold text-gray-700">Total Donors</h3>
                    <p className="text-2xl font-bold text-red-600">{data.donors.length}</p>
                  </div>
                </div>
                <div className="bg-white  p-6   rounded-lg shadow-md flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <ClipboardDocumentCheckIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-semibold text-gray-700">Total Requests</h3>
                    <p className="text-2xl font-bold text-blue-600">{data.requests.length}</p>
                  </div>
                </div>
                <div className="bg-white  p-6   rounded-lg shadow-md flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircleIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-semibold text-gray-700">Completed Requests</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {data.requests.filter(r => r.status === 'completed').length}
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
                  <h3 className="text-xl font-semibold mb-4">Request Status</h3>
                  <div className="h-64 md:h-96">
                    <ResponsiveContainer width="100%" height="80%">
                      <PieChart>
                        <Pie
                          data={requestStatusData}
                          cx="50%"
                          cy="50%"
                          
                          outerRadius="90%"
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {requestStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-1">
                  <h3 className="text-xl font-semibold mb-4">Donor Gender Distribution</h3>
                  <div className="h-64 md:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={donorGenderData}
                          cx="50%"
                          cy="50%"
                          innerRadius="60%"
                          outerRadius="80%"
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {donorGenderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-3">
                  <h3 className="text-xl font-semibold mb-4">Donor Blood Group Distribution</h3>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bloodGroupData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'donors' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Active Donors</h2>
              <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Blood Type
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Last Donation
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.donors.map((donor) => (
                      <tr key={donor._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{donor.name}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{donor.bloodType}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {donor.lastDonation ? new Date(donor.lastDonation).toLocaleDateString() : 'N/A'}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex space-x-2">
                            <a href={`tel:${donor.phone}`} className="text-blue-600 hover:text-blue-800">
                              <PhoneIcon className="h-5 w-5" />
                            </a>
                            <a href={`https://wa.me/${donor.phone}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                              </svg>
                            </a>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button
                            onClick={() => moveToDonated(donor._id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Mark as Donated
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'donated' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Donated Donors</h2>
              <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Blood Type
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Last Donation
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.donatedDonors && data.donatedDonors.map((donor) => (
                      <tr key={donor._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{donor.name}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{donor.bloodType}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {donor.lastDonation ? new Date(donor.lastDonation).toLocaleDateString() : 'N/A'}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button
                            onClick={() => moveToActive(donor._id)}
                            className={`text-blue-600 hover:text-blue-900 ${!canMoveToActive(donor.lastDonation) && 'opacity-50 cursor-not-allowed'}`}
                            disabled={!canMoveToActive(donor.lastDonation)}
                          >
                            {canMoveToActive(donor.lastDonation) ? (
                              <span className="flex items-center">
                                <ArrowPathIcon className="h-5 w-5 mr-1" />
                                Move to Active
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <XCircleIcon className="h-5 w-5 mr-1" />
                                Not Eligible Yet
                              </span>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Requests</h2>
              <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Patient Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Blood Type
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Urgency
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.requests.map((request) => (
                      <tr key={request._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{request.patientName}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{request.bloodType}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{request.urgency}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            request.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            request.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.status || 'Pending'}
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {request.status !== 'completed' && request.status !== 'cancelled' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(request._id, 'completed')}
                                className="text-green-600 hover:text-green-900 mr-3"
                              >
                                <CheckCircleIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleStatusChange(request._id, 'cancelled')}
                                className="text-red-600 hover:text-red-900"
                              >
                                <XCircleIcon className="h-5 w-5" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;