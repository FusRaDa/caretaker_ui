import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import CareGiverTimeStamps from "./caregiver/CareGiverTimeStamps";

function App() {
  return (
    <div>
      <Router>
        <ProviderComposer providers={[
          provider(AuthProvider),
          provider(ClientProvider),
          provider(CareGiverProvider),
          provider(TimeStampProvider),
        ]}>
          <Header/>
          <Routes>

            <Route element={<PrivateRoute/>}>
              <Route exact path='/' element={<TimeStamps/>} />
              <Route exact path='/caregiver' element={<CareGiverTimeStamps/>} />
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
