import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
Chart.register(...registerables);


const Report = ({ leads }) => {
  // Prepare the data for the chart
  const chartData = {
    labels: leads.map(lead => lead.productName), // Labels for the x-axis (Product Names)
    datasets: [
      {
        label: 'Quantity Sold',
        data: leads.map(lead => lead.quantitySold), // Data for the bar chart
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Revenue',
        data: leads.map(lead => lead.totalRevenue), // Data for total revenue
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  // Function to download PDF report
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Leads Report', 14, 20);

    // Create a table from leads data
    const tableData = leads.map(lead => [
      lead.transactionDate,
      lead.productName,
      lead.quantitySold,
      lead.totalRevenue,
      lead.customerSegment,
    ]);

    autoTable(doc, {
      head: [['Transaction Date', 'Product Name', 'Quantity Sold', 'Total Revenue', 'Customer Segment']],
      body: tableData,
      startY: 30,
    });

    doc.save('leads-report.pdf'); // Save the PDF with the specified name
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lead Report</h1>
      <button
        onClick={downloadPDF}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Download PDF Report
      </button>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Report;
