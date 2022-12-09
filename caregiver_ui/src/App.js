import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import TimeStamps from "./timestamp/TimeStamps";
import { ProviderComposer, provider } from "./utils/Compose";
import ErrorPage from "./utils/ErrorPage";
import Header from "./utils/Header";
import PrivateRoute from "./utils/PrivateRoute";
import Welcome from "./utils/Welcome";

function App() {
  return (
    <div>
      <Router>
        <ProviderComposer providers={[
          provider(AuthProvider),
        ]}>
          <Header/>
          <Routes>


            <Route element={<PrivateRoute/>}>
              <Route exact path='/' element={<TimeStamps/>}/>
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
