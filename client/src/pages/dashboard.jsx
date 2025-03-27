import { FaBus, FaCalendarAlt, FaUsers, FaTicketAlt, FaRoute } from 'react-icons/fa'; // Update icons for bus management
import { Link } from 'react-router-dom';

export default function BusTicketDashboard() {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/traffic-vehicle-urban-reflections-city.jpg?alt=media&token=f6462f17-8cbf-4415-9c15-733f702bc511)' }}>
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Centered Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="space-y-6 text-center max-w-7xl w-full px-6">
          <h1 className="text-4xl font-extrabold mt-[-180px] text-white mb-10">Highway Bus Ticket Management</h1>

          {/* Welcome Message */}
          <p className="text-lg text-white mb-10">Manage your bus tickets, routes, schedules, and more efficiently.</p>

          {/* Navigation Buttons - Horizontal Layout */}
          <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-center">
            {/* Book Ticket Button */}
            <Link to={``}>
              <button className="flex items-center justify-between w-full sm:w-60 p-4 bg-gradient-to-r from-blue-700 via-blue-800 to-black text-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transform transition duration-300 ease-in-out hover:ring-2 hover:ring-white hover:ring-opacity-50">
                <FaTicketAlt className="text-2xl" />
                <span className="ml-3 text-lg">Seat Booking</span>
              </button>
            </Link>

            {/* Manage Routes Button */}
            <Link to={``}>
              <button className="flex items-center justify-between w-full sm:w-60 p-4 bg-gradient-to-r from-green-700 via-green-800 to-black text-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transform transition duration-300 ease-in-out hover:ring-2 hover:ring-white hover:ring-opacity-50">
                <FaRoute className="text-2xl" />
                <span className="ml-3 text-lg">Bus Tracking</span>
              </button>
            </Link>

            {/* View Schedule Button */}
            <Link to={``}>
              <button className="flex items-center justify-between w-full sm:w-60 p-4 bg-gradient-to-r from-yellow-700 via-yellow-800 to-black text-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transform transition duration-300 ease-in-out hover:ring-2 hover:ring-white hover:ring-opacity-50">
                <FaCalendarAlt className="text-2xl" />
                <span className="ml-3 text-lg">Faq</span>
              </button>
            </Link>

            {/* Passenger Details Button */}
            <Link to={`/profile`}>
              <button className="flex items-center justify-between w-full sm:w-60 p-4 bg-gradient-to-r from-purple-700 via-purple-800 to-black text-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transform transition duration-300 ease-in-out hover:ring-2 hover:ring-white hover:ring-opacity-50">
                <FaUsers className="text-2xl" />
                <span className="ml-3 text-lg">Passenger Details</span>
              </button>
            </Link>

            {/* Reports Button */}
            <Link to={`/reports`}>
              <button className="flex items-center justify-between w-full sm:w-60 p-4 bg-gradient-to-r from-red-700 via-red-800 to-black text-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transform transition duration-300 ease-in-out hover:ring-2 hover:ring-white hover:ring-opacity-50">
                <FaBus className="text-2xl" />
                <span className="ml-3 text-lg">Admin</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      
    </div>
  );
}
