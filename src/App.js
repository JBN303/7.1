import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Interface from "./components/Interface";
import Login from "./components/Doctor/Login";
import SignUp from "./components/Doctor/SignUp";
import DoctorPage from './components/Doctor/DoctorPage';
import Interfac from './components/Admin/Interfac'
import AdminLogin from "./components/Admin/AdminLogin";
import Psignup from "./components/Patient/Psignup";
import Plogin from "./components/Patient/Plogin";
import DoctorList from './components/Admin/DoctorList';
import Demo from "./components/Demo";
import PatientView from "./components/Admin/PatientView";
import PatientProfile from "./components/Patient/PatientProfile";
import Patientinterface from "./components/Patientinterface";
import Psidebar from "./components/Patient/Psidebar";
import SpecializationTabs from "./components/Patient/Specialization";
import Nearby from "./components/Patient/Nearby";
import EditProfile from "./components/Doctor/EditProfile";
import MyAppointments from "./components/Patient/MyAppointments";
function App() {
  return (
    <div>
 <BrowserRouter>
    <Routes>
      <Route path='/' element={<Interface/>}></Route>
      
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/patient login' element={<Plogin/>}></Route>
      
      <Route path='/register' element={<SignUp />}></Route>
      <Route path='/patient register' element={<Psignup />}></Route>
      <Route path='/admin' element={<AdminLogin />}></Route>
      <Route path='/doctorview' element={<DoctorList />}></Route>
      <Route path="/edit/:userId" element={<EditProfile/>} />
      <Route path="/doctor/:userId" element={<DoctorPage />} />
      <Route path='/admindashboard' element={<Interfac/>}></Route>
     
      <Route path='/pview' element={<PatientView/>}></Route>
      <Route path='/patient/:id' element={<PatientProfile />} />
      <Route path="/pprofile" element={<Patientinterface/>}/>
      <Route path="/psidebar/:id" element={<Psidebar/>}/>
      <Route path="/spec/:id" element={<SpecializationTabs/>}/>
      <Route path="/near/:id" element={<Nearby/>}/>
      <Route path="/demo" element={<Demo/>}/>
      <Route path="/myapp/:id" element={<MyAppointments/>}/>
    </Routes> 
    </BrowserRouter>
    
    </div>
  );
}

export default App;
