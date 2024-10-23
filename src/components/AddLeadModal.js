import React, { useState, useEffect } from 'react';

const AddLeadModal = ({ onClose, onAddOrEditLead, editLead }) => {
  const [transactionDate, setTransactionDate] = useState('');
  const [productName, setProductName] = useState('');
  const [quantitySold, setQuantitySold] = useState('');
  const [totalRevenue, setTotalRevenue] = useState('');
  const [customerSegment, setCustomerSegment] = useState('');

  useEffect(() => {
    if (editLead) {
      setTransactionDate(editLead.transactionDate);
      setProductName(editLead.productName);
      setQuantitySold(editLead.quantitySold);
      setTotalRevenue(editLead.totalRevenue);
      setCustomerSegment(editLead.customerSegment);
    } else {
      // Reset fields if not in edit mode
      resetFields();
    }
  }, [editLead]);

  const resetFields = () => {
    setTransactionDate('');
    setProductName('');
    setQuantitySold('');
    setTotalRevenue('');
    setCustomerSegment('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newLead = {
      id: editLead ? editLead.id : Date.now(), // Generate a new ID if adding
      transactionDate,
      productName,
      quantitySold: Number(quantitySold),
      totalRevenue: Number(totalRevenue),
      customerSegment,
    };

    onAddOrEditLead(newLead);
    resetFields();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{editLead ? 'Edit Lead' : 'Add Lead'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Transaction Date</label>
            <input
              type="date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity Sold</label>
            <input
              type="number"
              value={quantitySold}
              onChange={(e) => setQuantitySold(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total Revenue</label>
            <input
              type="number"
              value={totalRevenue}
              onChange={(e) => setTotalRevenue(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Customer Segment</label>
            <input
              type="text"
              value={customerSegment}
              onChange={(e) => setCustomerSegment(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {editLead ? 'Update Lead' : 'Add Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;
