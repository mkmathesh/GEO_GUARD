import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { UserHome } from "./pages/User/UserHome";
import { Complient } from "./pages/User/Complient";
import { AdminHome } from "./pages/Admin/AdminHome";
import { GovHome } from "./pages/Gov/GovHome";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Layout/Navbar";
import { Footer } from "./components/Layout/Footer";
import { ComplientView } from "./pages/Gov/ComplientView";
import { Status } from "./pages/Gov/status";
import { MapCheck } from "./pages/Gov/MapCheck";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route
            path="/"
            element={
              <ProtectedRoute allow="/">
                <Navbar home="home" nav1="home" nav2="home"  nav3="home"  about="about" sign="sign in"/>
                <Dashboard />
              </ProtectedRoute>
            }
          >
          </Route>
            <Route
            path="/login"
            element={
              <ProtectedRoute allow="/">
                <Login/>
              </ProtectedRoute>
            }
          ></Route>
            <Route
            path="/register"
            element={
              <ProtectedRoute allow="/">
                <Register/>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/user"
            element={
              <ProtectedRoute allow="user">
                <Navbar home="home" nav1="detail"  nav2="complaint"  nav3="contact"  about="about" sign="sign out"/>
                <UserHome/>
              </ProtectedRoute>
            }
          >
          </Route>
          <Route
            path="/user/complaint"
            element={
              <ProtectedRoute allow="user">
                <Navbar home="home" nav1="detail"  nav2="complaint"  nav3="contact"  about="about" sign="sign out"/>
               <Complient/>
              </ProtectedRoute>
            }
          >
          </Route>
         <Route
            path="/officer"
            element={
              <ProtectedRoute allow="officer">
                <Navbar home="home" nav1="status"  nav2="complaints"  nav3="check"  about="about" sign="sign out"/>
                <GovHome/>
              </ProtectedRoute>
            }
          ></Route>
            <Route
            path="/officer/complaints"
            element={
              <ProtectedRoute allow="officer">
                <Navbar home="home" nav1="status"  nav2="complaints"  nav3="check"  about="about" sign="sign out"/>
                <ComplientView/>
              </ProtectedRoute>
            }
          ></Route>
           <Route
            path="/officer/status"
            element={
              <ProtectedRoute allow="officer">
                <Navbar home="home" nav1="status"  nav2="complaints"  nav3="check"  about="about" sign="sign out"/>
                <Status/>
              </ProtectedRoute>
            }
          ></Route>
           <Route
            path="/officer/check"
            element={
              <ProtectedRoute allow="officer">
                <Navbar home="home" nav1="status"  nav2="complaints"  nav3="check"  about="about" sign="sign out"/>
                <MapCheck/>
              </ProtectedRoute>
            }
          ></Route>
              <Route
            path="/officer/check"
            element={
              <ProtectedRoute allow="officer">
                <Navbar home="home" nav1="status"  nav2="complaints"  nav3="check"  about="about" sign="sign out"/>
                <MapCheck/>
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/admin" />
          <Route path="officer" />
          <Route path="*" element={
            <div className="w-[100%] h-[100vh] flex justify-center items-center">
              <h1 className="text-5xl font-bold">404 ;Page Not Found!</h1>
            </div>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
