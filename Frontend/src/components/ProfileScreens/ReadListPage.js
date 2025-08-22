


// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import Loader from "../GeneralScreens/Loader";
// import { useNavigate, Link } from "react-router-dom";
// import { FiArrowLeft } from "react-icons/fi";
// import { AuthContext } from "../../Context/AuthContext";
// import { AiFillLock } from "react-icons/ai";
// import { BsThreeDots } from "react-icons/bs";
// import ReadListStoryItem from "../StoryScreens/ReadListStoryItem";

// import "../../Css/ReadListPage.css";

// const ReadListPage = () => {
//   const navigate = useNavigate();
//   const [readList, setReadList] = useState([]);
//   const [loading, setLoading] = useState(true); // start as true
//   const { config, activeUser } = useContext(AuthContext);

//   useEffect(() => {
//     const getUserReadingList = async () => {
//       setLoading(true);
//       try {
//         const { data } = await axios.get(`/user/readList`, config); // fixed API call
//         setReadList(data || []); // fallback empty array
//       } catch (error) {
//         navigate("/");
//       } finally {
//         setLoading(false);
//       }
//     };
//     getUserReadingList();
//   }, [config, navigate]);

//   const editDate = (createdAt) => {
//     const d = new Date(createdAt);
//     const datestring =
//       d.toLocaleString("eng", { month: "long" }).substring(0, 3) +
//       "  " +
//       d.getDate();
//     return datestring;
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="Inclusive-readList-page">
//           <Link to={"/"}>
//             <FiArrowLeft />
//           </Link>
//           <h2>Reading List </h2>

//           <div className="readList-top-block">
//             <img
//               src={
//                 activeUser?.photo
//                   ? `/userPhotos/${activeUser.photo}`
//                   : "/userPhotos/default.png"
//               }
//               alt={activeUser?.username || "User"}
//             />

//             <div className="activeUser-info-wrapper">
//               <b>{activeUser?.username || "User"}</b>
//               <div>
//                 <span>{editDate(Date.now())}</span>
//                 <span>-</span>
//                 <span>{activeUser?.readListLength || 0} stories</span>
//                 <i>
//                   <AiFillLock />
//                 </i>
//               </div>
//             </div>

//             <i className="BsThreeDots-icon">
//               <BsThreeDots />
//             </i>
//           </div>

//           <div className="readList-story-wrapper">
//             {readList?.length > 0 ? (
//               readList.map(
//                 (story) =>
//                   story && (
//                     <ReadListStoryItem
//                       key={story._id}
//                       story={story}
//                       editDate={editDate}
//                     />
//                   )
//               )
//             ) : (
//               <div className="empty-readList">Reading List is empty</div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ReadListPage;


import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Loader from "../GeneralScreens/Loader";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";
import { AiFillLock } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import ReadListStoryItem from "../StoryScreens/ReadListStoryItem";
import "../../Css/ReadListPage.css";

const ReadListPage = () => {
  const navigate = useNavigate();
  const { config, activeUser } = useContext(AuthContext);
  const [readList, setReadList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's reading list
  useEffect(() => {
    const getUserReadingList = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/readList`,
          config
        );
        setReadList(data || []);
      } catch (error) {
        console.error(error);
        navigate("/"); // Redirect if unauthorized
      } finally {
        setLoading(false);
      }
    };

    getUserReadingList();
  }, [config, navigate]);

  // Format date
  const editDate = (dateValue) => {
    const d = new Date(dateValue);
    return d.toLocaleString("en", { month: "short", day: "numeric" });
  };

  if (loading) return <Loader />;

  return (
    <div className="Inclusive-readList-page">
      <Link to={"/"} className="back-link">
        <FiArrowLeft />
      </Link>

      <h2>Reading List</h2>

      <div className="readList-top-block">
        <img
          src={
            activeUser?.photo
              ? `/userPhotos/${activeUser.photo}`
              : "/userPhotos/default.png"
          }
          alt={activeUser?.username || "User"}
        />

        <div className="activeUser-info-wrapper">
          <b>{activeUser?.username || "User"}</b>
          <div className="info-details">
            <span>{editDate(Date.now())}</span>
            <span>-</span>
            <span>{activeUser?.readListLength || 0} stories</span>
            <AiFillLock />
          </div>
        </div>

        <BsThreeDots className="BsThreeDots-icon" />
      </div>

      <div className="readList-story-wrapper">
        {readList?.length > 0 ? (
          readList.map(
            (story) =>
              story && (
                <ReadListStoryItem
                  key={story._id}
                  story={story}
                  editDate={editDate}
                />
              )
          )
        ) : (
          <div className="empty-readList">Reading List is empty</div>
        )}
      </div>
    </div>
  );
};

export default ReadListPage;

