import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ClientProvider } from "./context/ClientContext";
import { CareGiverProvider } from "./context/CareGiverContext";
import { TimeStampProvider } from "./context/TimeStampContext";
import TimeStamps from "./timestamp/TimeStamps";
import { ProviderComposer, provider } from "./utils/Compose";
import ErrorPage from "./utils/ErrorPage";
import Header from "./utils/Header";
import PrivateRoute from "./utils/PrivateRoute";
import Welcome from "./utils/Welcome";
import Caregivers from "./caregiver/CareGivers";
import Clients from "./client/Clients";
import Home from "./Home";
import CareGiverTimeStamps from "./caregiver/CareGiverTimeStamps";
import { RecordProvider } from "./context/RecordContext";
import RecordList from "./record/RecordList";
import RecordPage from "./record/RecordPage";
import ClientMedicationRecordList from "./client/ClientMedicationRecordList";



function App() {
  return (
    <div>
      <Router>
        <ProviderComposer providers={[
          provider(AuthProvider),
          provider(CareGiverProvider),
          provider(ClientProvider),
          provider(TimeStampProvider),
          provider(RecordProvider),
        ]}>
          <Header/>
          <Routes>

            <Route element={<PrivateRoute/>}>
              <Route element={<Home/>} exact path='/' />

              <Route element={<Caregivers/>} exact path='/caregivers' />
              <Route element={<CareGiverTimeStamps/>} exact path='/caregivers/:pk' />
   
              <Route element={<Clients/>} exact path='/clients' />
              <Route element={<ClientMedicationRecordList/>} exact path='/clients/:pk' />
         
              <Route element={<TimeStamps/>} exact path='/timestamps' />
              
              <Route element={<RecordList/>} exact path='/records' />
              <Route element={<RecordPage/>} exact path='/records/:pk' />
              
            </Route>

            <Route element={<Welcome/>} path='/login' exact />
            <Route element={<ErrorPage/>} path='/error_page' exact />

          </Routes>
        </ProviderComposer>
      </Router>
    </div>
  )
}

export default App;
