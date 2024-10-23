import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import dashboardIcon from '../assets/images/dashboard.jpg';
import leadsIcon from '../assets/images/leads.jpg';
import analyticsIcon from '../assets/images/analytics.jpg';
import reportsIcon from '../assets/images/reports.jpg';

const initialLinks = [
  { path: '/dashboard', label: 'Dashboard', icon: dashboardIcon },
  { path: '/leads', label: 'Leads', icon: leadsIcon },
  { path: '/analytics', label: 'Analytics', icon: analyticsIcon },
  { path: '/reports', label: 'Reports', icon: reportsIcon },
];

const Sidebar = () => {
  const [links, setLinks] = useState(initialLinks);

  const handleAddLink = () => {
    const newLink = prompt("Enter the new link path and label (comma separated):");
    if (newLink) {
      const [path, label] = newLink.split(',').map(item => item.trim()); // Trim each item
      if (path && label) {
        const newIcon = prompt("Enter the icon path (leave empty for default):") || dashboardIcon; // Default icon
        setLinks([...links, { path, label, icon: newIcon }]);
      } else {
        alert("Both path and label are required."); // Alert if either is missing
      }
    }
  };

  const handleRemoveLink = (pathToRemove) => {
    setLinks(links.filter(link => link.path !== pathToRemove));
  };

  return (
    <div className="min-h-screen w-64 flex flex-col">
      <div className="text-2xl font-bold p-6">
        EzyMetrics
      </div>
      <nav className="flex flex-col gap-4 p-4">
        {links.map(({ path, label, icon }) => (
          <div key={path} className="flex items-center justify-between">
            <NavLink
              to={path}
              className={({ isActive }) => isActive ? 'text-blue-900 font-extrabold p-3 rounded-md flex items-center' : 'p-3 rounded-md flex items-center'}
            >
              <img src={icon} alt={label} className="w-6 h-6 mr-3" />
              {label}
            </NavLink>
            <button
              onClick={() => handleRemoveLink(path)}
              className="text-red-500 hover:text-red-700"
              title="Remove Link"
            >
              &times; {/* Close icon */}
            </button>
          </div>
        ))}
        <button
          onClick={handleAddLink}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add Link
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
