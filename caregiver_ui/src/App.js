import { Route, Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import TimeStamps from "./timestamp/TimeStamps";
import { ProviderComposer, provider } from "./utils/Compose";
import Login from "./utils/Login";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Router>
        <ProviderComposer providers={[
          provider(AuthProvider)
        ]}>

          <Routes>
            <Route element={<PrivateRoute/>}>
              <Route element={<TimeStamps/>} path='/' exact />
            </Route>

            <Route element={<Login/>} path='/login' exact />

          
          </Routes>
        </ProviderComposer>
      </Router>
    </div>
  )
}

export default App;
