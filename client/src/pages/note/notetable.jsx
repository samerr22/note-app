import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaArrowLeft } from "react-icons/fa";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function notetable() {
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");

  // Function to remove HTML tags
  const stripHtmlTags = (htmlContent) => {
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/note/nget`);
        const data = await res.json();
        if (res.ok) {
          setInfo(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchinfo();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title of the PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Order Report", 14, 20);

    let yOffset = 30; // Starting position for the first order

    // Loop through the orders (filter) and generate the layout
    filter.forEach((course, index) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      // Order Details
      doc.text(`Item: ${course.itemname}`, 14, yOffset);
      yOffset += 8;
      doc.text(`Price: $${course.amount}`, 14, yOffset);
      yOffset += 8;
      doc.text(`Paymentmethod: ${course.paymentmethod}`, 14, yOffset);
      yOffset += 8;
      doc.text(`quantity: ${course.quntity}`, 14, yOffset);
      yOffset += 8;
      doc.text(`Phone: ${course.phone}`, 14, yOffset);
      yOffset += 8;
      doc.text(`Address: ${course.address}`, 14, yOffset);
      yOffset += 8;

      // Add a line to separate orders
      doc.line(14, yOffset, 200, yOffset);
      yOffset += 10;

      // Add space between orders
      if (yOffset > 250) {
        doc.addPage();
        yOffset = 20; // Reset position after a new page
      }
    });

    // Save the document with the file name
    doc.save("OrderReport.pdf");
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/note/ddelete/${DId}`,
        {
          method: "DELETE"
        }
      );
      if (res.ok) {
        setInfo((prev) => prev.filter((course) => course._id !== DId));
        alert("Deleted");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...Info]);
    } else {
      const filteredData = Info.filter(
        (course) =>
          course.itemname &&
          course.itemname.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  return (
    <div
      className="h-[800px] relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/condiments-prepare-italian-pasta.jpg?alt=media&token=2fb237c4-2775-4e24-bfbc-4d86efb28b07)"
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="items-center justify-center flex relative z-10">
        <div className="items-center mt-10">
          {/* Search Input */}
          <div className="flex justify-center mt-4">
            <input
              type="text"
              placeholder="Search Orders..."
              className="w-[400px] h-12 rounded-full bg-black shadow-xl border border-slate-400 bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={generatePDF}
              className="mt-4 bg-blue-600 font-serif text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Order History Report
            </button>
            <Link to={`/Iadd`}>
              <button className="mt-4 bg-blue-600 font-serif text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                New Order
              </button>
            </Link>
          </div>

          {/* Back Navigation */}
          <Link
            to={`/`}
            className="text-md text-gray-400 hover:text-blue-400 underline flex items-center mt-4"
          >
            <FaArrowLeft className="mr-2" /> {/* Left arrow icon */}
            Back to Dashboard
          </Link>

          {/* Orders Section */}
          <div className="overflow-x-auto scrollbar-none lg:h-[500px] ">
            <div className="lg:w-[1200px] mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filter && filter.length > 0 ? (
                filter.map((order) => (
                  <div
                    key={order._id}
                    className="bg-gray-800 bg-opacity-50 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 flex flex-col"
                  >
                    <div className="text-xl font-semibold">{order.title}</div>
                    <div className="mt-2 text-sm text-gray-400 ">
                      {stripHtmlTags(order.content)}{" "}
                      {/* Stripping out HTML tags */}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex mt-4 gap-4 justify-center">
                      <Link to={`/iupdate/${order._id}`}>
                        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300">
                          <FaEdit className="text-lg mr-2" /> {/* Edit Icon */}
                        </button>
                      </Link>

                      <button
                        onClick={() => {
                          setformId(order._id);
                          handleDeleteUser();
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                      >
                        <FaTrashAlt className="text-lg mr-2" />{" "}
                        {/* Delete Icon */}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-500 py-4">
                  No orders found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
