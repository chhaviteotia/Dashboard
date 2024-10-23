import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Leads from './components/Leads';
import Reports from './components/Reports';

const App = () => {
  const [leads, setLeads] = useState([
    // Initial leads data
    { id: 1, transactionDate: '2024-10-23', productName: 'Product A', quantitySold: 5, totalRevenue: 100, customerSegment: 'Retail' },
    { id: 2, transactionDate: '2024-10-22', productName: 'Product B', quantitySold: 3, totalRevenue: 75, customerSegment: 'Wholesale' },
  ]);
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100">
          <Routes>
            <Route path="/dashboard" element={<h1>Dashboard</h1>} />
            <Route path="/leads" element={<Leads leads={leads} setLeads={setLeads} />} />
            <Route path="/analytics" element={<h1>Analytics</h1>} />
            <Route path="/reports" element={<Reports leads={leads}/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
