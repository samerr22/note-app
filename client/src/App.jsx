import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";


import Dashboard from "./pages/dashboard";


import SignUp from "./pages/SignUp";
import Signin from "./pages/Signin";
import Profile from "./pages/profile";

import Noteadd from "./pages/note/noteadd";

























export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>


      <Route path="/sign" element={<Signin />} />
     


      <Route path="/sign-up" element={<SignUp />} />

      <Route path="/note" element={<Noteadd />} />
    


      <Route element={<PrivateRoute />}>
      <Route path="/profile" element={<Profile />} />
     
     

   
        <Route path="/dash" element={<Dashboard />} />


        


       
        </Route>

      
       
     
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
