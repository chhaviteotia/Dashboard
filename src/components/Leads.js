import React, { useState } from 'react';
import AddLeadModal from './AddLeadModal';

const Leads = () => {
  const [leads, setLeads] = useState([
    { id: 1, transactionDate: '2024-10-23', productName: 'Product A', quantitySold: 5, totalRevenue: 100, customerSegment: 'Retail' },
    { id: 2, transactionDate: '2024-10-22', productName: 'Product B', quantitySold: 3, totalRevenue: 75, customerSegment: 'Wholesale' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLead, setEditLead] = useState(null); // Track which lead is being edited

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditLead(null); // Reset edit state when modal closes
  };

  const addOrEditLead = (newLead) => {
    if (editLead) {
      // If editing, update the existing lead
      setLeads(leads.map(lead => lead.id === editLead.id ? newLead : lead));
    } else {
      // If adding new, add to the leads array
      setLeads([...leads, newLead]);
    }
    handleModalClose();
  };

  const handleDeleteLead = (id) => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  const handleEditLead = (lead) => {
    setEditLead(lead);
    handleModalOpen(); // Open modal for editing
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leads</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleModalOpen}
        >
          Add Lead
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="text-left py-2 px-4 border-b">Transaction Date</th>
            <th className="text-left py-2 px-4 border-b">Product Name</th>
            <th className="text-left py-2 px-4 border-b">Quantity Sold</th>
            <th className="text-left py-2 px-4 border-b">Total Revenue</th>
            <th className="text-left py-2 px-4 border-b">Customer Segment</th>
            <th className="text-left py-2 px-4 border-b">Action</th> {/* Action Column */}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="py-2 px-4 border-b">{lead.transactionDate}</td>
              <td className="py-2 px-4 border-b">{lead.productName}</td>
              <td className="py-2 px-4 border-b">{lead.quantitySold}</td>
              <td className="py-2 px-4 border-b">{lead.totalRevenue}</td>
              <td className="py-2 px-4 border-b">{lead.customerSegment}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                  onClick={() => handleEditLead(lead)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  onClick={() => handleDeleteLead(lead.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add or Edit Lead Modal */}
      {isModalOpen && (
        <AddLeadModal
          onClose={handleModalClose}
          onAddOrEditLead={addOrEditLead}
          editLead={editLead} // Pass the lead to edit if in edit mode
        />
      )}
    </div>
  );
};

export default Leads;
