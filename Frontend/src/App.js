


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import PrivateRoute from "./components/Routing/PrivateRoute";
import Home from "./components/GeneralScreens/Home";
import LoginScreen from "./components/AuthScreens/LoginScreen";
import RegisterScreen from "./components/AuthScreens/RegisterScreen";
import ForgotPasswordScreen from "./components/AuthScreens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/AuthScreens/ResetPasswordScreen";
import AddStory from "./components/StoryScreens/AddStory";
import DetailStory from "./components/StoryScreens/DetailStory";
import Header from "./components/GeneralScreens/Header";
import Footer from "./components/GeneralScreens/Footer";
import Profile from "./components/ProfileScreens/Profile";
import EditProfile from "./components/ProfileScreens/EditProfile";
import ChangePassword from "./components/ProfileScreens/ChangePassword";
import NotFound from "./components/GeneralScreens/NotFound";
import EditStory from "./components/StoryScreens/EditStory";
import ReadListPage from "./components/ProfileScreens/ReadListPage";
import "../src/Css/Layout.css";
import ImageBanner from "./components/GeneralScreens/ImageBanner";
import "../src/Css/Theme.css"; 


// Assume ThemeProvider is imported and wrapping <App/> in index.js

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* All pages that should have the Header and Footer must be nested here */}
          <Route path="/" element={<LayoutsWithHeader />}>
            {/* Public routes that need the layout */}
            <Route path="login" element={<LoginScreen />} />
            <Route path="register" element={<RegisterScreen />} />
            <Route path="forgotpassword" element={<ForgotPasswordScreen />} />
            <Route path="resetpassword" element={<ResetPasswordScreen />} />
            <Route path="story/:slug" element={<DetailStory />} />
            <Route path="*" element={<NotFound />} />

            {/* Private routes that need the layout */}
            <Route element={<PrivateRoute />}>
              <Route index element={<Home />} />
              <Route path="addstory" element={<AddStory />} />
              <Route path="profile" element={<Profile />} />
              <Route path="edit_profile" element={<EditProfile />} />
              <Route path="change_Password" element={<ChangePassword />} />
              <Route path="readList" element={<ReadListPage />} />
              <Route path="story/:slug/edit" element={<EditStory />} />
              {/* You no longer need separate private routes for like, delete, etc. as they are handled by the main DetailStory component */}
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

// This component correctly renders the header, the specific page content (via Outlet), and the footer.
const LayoutsWithHeader = () => {
  return (
    <>
      <Header />
      <ImageBanner videoSrc="/images/vid.mp4"/>
      <Outlet />
      <Footer />
    </>
  );
};

export default App;