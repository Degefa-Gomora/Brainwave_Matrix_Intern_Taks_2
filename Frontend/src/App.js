// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Outlet } from "react-router-dom";
// import PrivateRoute from "./components/Routing/PrivateRoute";
// import Home from "./components/GeneralScreens/Home";
// import LoginScreen from "./components/AuthScreens/LoginScreen";
// import RegisterScreen from "./components/AuthScreens/RegisterScreen";
// import ForgotPasswordScreen from "./components/AuthScreens/ForgotPasswordScreen";
// import ResetPasswordScreen from "./components/AuthScreens/ResetPasswordScreen";
// import AddStory from "./components/StoryScreens/AddStory";
// import DetailStory from "./components/StoryScreens/DetailStory";
// import Header from "./components/GeneralScreens/Header";
// import Footer from "./components/GeneralScreens/Footer";
// import Profile from "./components/ProfileScreens/Profile";
// import EditProfile from "./components/ProfileScreens/EditProfile";
// import ChangePassword from "./components/ProfileScreens/ChangePassword";
// import NotFound from "./components/GeneralScreens/NotFound";
// import EditStory from "./components/StoryScreens/EditStory";
// import ReadListPage from "./components/ProfileScreens/ReadListPage";

// // / Import the ThemeProvider
// import { ThemeProvider } from "./Context/ThemeContext";

// const App = () => {
//   return (
//     <ThemeProvider>
//       <Router>
//         <div className="App">
//           <Routes>
//             <Route path="/" element={<LayoutsWithHeader />}>
//               <Route path="*" element={<NotFound />} />

//               <Route exact path="/" element={<PrivateRoute />}>
//                 <Route exact path="/" element={<Home />} />
//               </Route>

//               <Route exact path="/story/:slug" element={<DetailStory />} />

//               <Route exact path="/addstory" element={<PrivateRoute />}>
//                 <Route exact path="/addstory" element={<AddStory />} />
//               </Route>

//               <Route exact path="/profile" element={<PrivateRoute />}>
//                 <Route exact path="/profile" element={<Profile />} />
//               </Route>

//               <Route exact path="/edit_profile" element={<PrivateRoute />}>
//                 <Route exact path="/edit_profile" element={<EditProfile />} />
//               </Route>

//               <Route exact path="/change_Password" element={<PrivateRoute />}>
//                 <Route
//                   exact
//                   path="/change_Password"
//                   element={<ChangePassword />}
//                 />
//               </Route>

//               <Route exact path="/story/:slug/like" element={<PrivateRoute />}>
//                 <Route
//                   exact
//                   path="/story/:slug/like"
//                   element={<DetailStory />}
//                 />
//               </Route>

//               <Route exact path="/story/:slug/edit" element={<PrivateRoute />}>
//                 <Route exact path="/story/:slug/edit" element={<EditStory />} />
//               </Route>

//               <Route
//                 exact
//                 path="/story/:slug/delete"
//                 element={<PrivateRoute />}
//               >
//                 <Route
//                   exact
//                   path="/story/:slug/delete"
//                   element={<DetailStory />}
//                 />
//               </Route>
//               <Route
//                 exact
//                 path="/story/:slug/addComment"
//                 element={<PrivateRoute />}
//               >
//                 <Route
//                   exact
//                   path="/story/:slug/addComment"
//                   element={<DetailStory />}
//                 />
//               </Route>

//               <Route exact path="/readList" element={<PrivateRoute />}>
//                 <Route exact path="/readList" element={<ReadListPage />} />
//               </Route>
//             </Route>

//             <Route exact path="/login" element={<LoginScreen />} />
//             <Route exact path="/register" element={<RegisterScreen />} />

//             <Route
//               exact
//               path="/forgotpassword"
//               element={<ForgotPasswordScreen />}
//             />

//             <Route
//               exact
//               path="/resetpassword"
//               element={<ResetPasswordScreen />}
//             />
//           </Routes>
//         </div>
//       </Router>
//     </ThemeProvider>
//   );
// };

// const LayoutsWithHeader = () => {
//   return (
//     <>
//     <ThemeProvider>
//       <Header />
//       <Outlet />
//       <Footer />
//     </ThemeProvider>
//   );
// };

// export default App;


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
      <Outlet />
      <Footer />
    </>
  );
};

export default App;