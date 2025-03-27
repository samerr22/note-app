import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [validation, setValidation] = useState(null);

  console.log(validation)
 
  

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Plese fill out all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };



  //validation
  const handlePhoneNumberChange = (e) => {
    const telephone = e.target.value.trim();
    const phonePattern =
      /^[\+]?[0-9]{1,4}[\s\-]?[0-9]{1,4}[\s\-]?[0-9]{1,4}[\s\-]?[0-9]{1,4}$/; // Pattern for phone numbers

    if (telephone === "") {
      setValidation(null);
    } else if (!phonePattern.test(telephone)) {
      setValidation(" valid phone number");
    } else {
      setFormData({ ...formData, telephone });
      setValidation(null);
    }
  };


 

  return (
    <div
    className="min-h-screen bg-cover bg-center flex items-center justify-center"
    style={{
      backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/traffic-vehicle-urban-reflections-city.jpg?alt=media&token=f6462f17-8cbf-4415-9c15-733f702bc511',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}
  >
    <div className="bg-opacity-80 bg-none p-8 rounded-xl shadow-xl max-w-lg w-full">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div>
          <h3 className="font-semibold ml-1 text-slate-950">Email</h3>
          <input
            className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="name@company.com"
            id="email"
            onChange={handlchange}
          />
        </div>
        <div>
          <h3 className="font-semibold text-slate-950 ml-1">Username</h3>
          <input
            className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Username"
            id="username"
            onChange={handlchange}
            required
          />
        </div>
        <div>
          <h3 className="font-semibold text-slate-950 text-slate-300 ml-1">Password</h3>
          <input
            className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            id="password"
            onChange={handlchange}
            required
          />
        </div>
        <div className="flex gap-6 flex-wrap">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-950 ml-1 mt-4">Gender</h3>
              <select
                name="seat"
                id="Gender"
               
                className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="40">Male</option>
                <option value="50">Femal</option>
              </select>
            </div>
            </div>
        
        
        <button
          className="bg-blue-600 text-white p-4 rounded-lg w-full h-12 hover:bg-blue-700 transition-all duration-300 focus:outline-none"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span>Loading...</span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
  
      <div className="flex gap-2 text-sm mt-5 text-white justify-center">
        <span>Have an account?</span>
        <Link to="/sign" className="text-blue-400 hover:text-blue-500">
          Sign In
        </Link>
      </div>
  
      {errorMessage && (
        <p className="mt-5 text-red-600 bg-red-200 p-4 rounded-lg text-center">
          {errorMessage}
        </p>
      )}
    </div>
  </div>
  
  );
}
