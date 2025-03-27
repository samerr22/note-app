import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaMoneyBillWave, FaClipboardList, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

export default function Update() {

    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
   
    const navigate = useNavigate();

    
    

      const {mid} = useParams();
  

   

 
  
  useEffect(() => {
    try {
      const fetchE = async () => {
        const res = await fetch(
          `http://localhost:3000/api/order/oget?upId=${mid}`
        );
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedE = data.find(
            (course) => course._id === incomid
          );
          console.log(selectedE)
          if (selectedE) {
            setFormData(selectedE);
          }
        }
      };
      fetchE();
    } catch (error) {
      console.log(error.message);
    }
  }, [incomid]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
      const res = await fetch(`http://localhost:3000/api/order/oupdate/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),

      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        
        alert("sucsses ")
        navigate("");
        
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };


  
  


 
 


 

  return (
    <div
         className="relative w-full h-[900px] bg-cover bg-center"
         style={{
           backgroundImage:
             "url(https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/vintage-old-rustic-cutlery-dark_1220-4886.jpg?alt=media&token=d9c24b0f-4046-4e50-ab02-2ca7d6ae8cba)"
         }}
       >
         {/* Overlay for better text visibility */}
         <div className="absolute inset-0 bg-black opacity-60"></div>
   
         <div className="relative z-10 flex items-center justify-center h-full">
           <div className="flex flex-col items-center w-full max-w-md space-y-6 mt-10  bg-opacity-50 bg-gray-800 p-8 rounded-xl shadow-lg opacity-90">
             <h1 className="text-3xl font-bold text-center text-white">
               Update Order
             </h1>
             <Link
               to={`/`}
               className="text-md text-gray-400 hover:text-blue-400 underline"
             >
               Back
             </Link>
             
             <form onSubmit={handleSubmit} className="w-full space-y-4">
             <div className="flex items-center space-x-2">
              <input
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                type="text"
                placeholder="itemname"
                id="itemname"
                onChange={(e) => setFormData({ ...formData, itemname: e.target.value })}
                value={formData.itemname}
                
                
                
              />
            </div>
               <div className="flex items-center space-x-2">
                 <input
                   className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                   type="text"
                   placeholder="Amount"
                   id="amount"
                   onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                   value={formData.amount}
                  
                  
                  
                 />
                
               </div>
               <div className="mt-[4px]">
                  
                  <p className=" text-red-700 bg-white opacity-60    text-sm    rounded-lg text-center ">
                      amount must be a number
                  </p>
              
              </div>

               
   
               <div className="flex items-center space-x-2">
                 <input
                   className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                   type="text"
                   placeholder="phone"
                   id="phone"
                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                   value={formData.phone}
                   maxLength={10}
                 />
               </div>
               <div className="mt-[4px]">
                 
                      <p className=" text-red-700 bg-white opacity-60    text-sm    rounded-lg text-center ">
                        Phone number must be number
                      </p>
              
                  </div>
   
               <div className="flex items-center space-x-2">
                 <input
                   className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                   type="text"
                   placeholder="address"
                   id="address"
                   onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        value={formData.address}
                 />
               </div>
               <div className="flex items-center space-x-2">
              <select
                name="paymentmethod"
                id="paymentmethod"
                onChange={(e) => setFormData({ ...formData, paymentmethod: e.target.value })}
                        value={formData.paymentmethod}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              >
                <option value="" disabled selected>
                  Select paymentmethod
                </option>
                <option value="credit_card">credit_card</option>
                <option value="paypal">paypal</option>
                <option value="cash_on_delivery">cash_on_delivery</option>
             
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <select
                name="date"
                id="quntity"
               
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
                onChange={(e) => setFormData({ ...formData, quntity: e.target.value })}
                value={formData.quntity}
              >
                <option value="" disabled selected>
                  Select quantity
                </option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
              </select>
            </div>
   
              
   
               <div>
                 <textarea
                   className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                   placeholder="Notes"
                   id="notes"
                   onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        value={formData.notes}
                   rows="4"
                 />
               </div>
               <button
                 type="submit"
                 className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                 Submit
               </button>
             </form>
             {publishError && (
               <p className="text-red-500 text-sm">{publishError}</p>
             )}
           </div>
         </div>
       </div>
  )
}
