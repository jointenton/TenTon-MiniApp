// App.js
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Home from './pages/Home';
import About from './pages/About';
import Event from './pages/Event';
import SelectTag from './pages/Signup2';
import ProfessionalForm from './pages/Signup3';
import SuccessPage from './pages/SuccessPage';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';
import ProfilePage from './pages/Profile';
import Tasks from './pages/Task';
import Search from './pages/Search';
import JobPage from './pages/JobPage';
import BountyPage from './pages/BountyPage';
import EventPage from './pages/EventPage';
import OrgType from './pages/OrgType';
import Welcome from './pages/Welcome';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/select-tag' element={<SelectTag />} />
        <Route path='/select-org-type' element={<OrgType />} />
        <Route path='/profession' element={<ProfessionalForm />} />
        <Route path='/success' element={<SuccessPage />} />
        <Route path='/signin' element={<Signin />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/events' element={<Event />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/search' element={<Search />} />
          <Route path='/job/:id' element={<JobPage />} />
          <Route path='/bounty/:id' element={<BountyPage />} />
          <Route path='/events/:id' element={<EventPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
      </Routes>
      {isAuthenticated && <Footer />}
    </BrowserRouter>
  );
}

export default App;
