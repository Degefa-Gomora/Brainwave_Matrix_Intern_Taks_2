// import React from 'react';
// import { Link } from 'react-router-dom';

// const Story = ({ story }) => {

//     const editDate = (createdAt) => {
//         const monthNames = ["January", "February", "March", "April", "May", "June",
//         "July", "August", "September", "October", "November", "December"
//         ];
//         const d = new Date(createdAt);
//         var datestring = d.getDate() + " " +monthNames[d.getMonth()] + " ," + d.getFullYear() 
//         return datestring
//     }

//     const truncateContent = (content) => {
//         const trimmedString = content.substr(0, 73);
//         return trimmedString
//     }
//     const truncateTitle= (title) => {
//         const trimmedString = title.substr(0, 69);
//         return trimmedString
//     }
    
//     return (

//         <div className="story-card">
//             <Link to={`/story/${story.slug}`} className="story-link">

//                 <img className=" story-image" src={`/storyImages/${story.image}`} alt={story.title} />
//                 <div className="story-content-wrapper">

//                     <h5 className="story-title">
                        
//                     {story.title.length > 76 ? truncateTitle(story.title)+"..." : story.title
                    
//                     }
//                     </h5>


//                     <p className="story-text"dangerouslySetInnerHTML={{__html : truncateContent( story.content) +"..."}}>
//                         </p>
//                     <p className="story-createdAt">{editDate(story.createdAt)} 
//                     </p>
//                 </div>
//             </Link>
//         </div>

//     )
// }

// export default Story;



import React from "react";
import { Link } from "react-router-dom";

const Story = ({ story }) => {
  const editDate = (createdAt) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date(createdAt);
    return `${d.getDate()} ${monthNames[d.getMonth()]}, ${d.getFullYear()}`;
  };

  const truncateText = (text, limit) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  // ✅ Use environment variable for backend API
  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <div className="story-card">
      <Link to={`/story/${story.slug}`} className="story-link">
        {/* ✅ Load images from backend instead of hardcoded /storyImages */}
        <img
          className="story-image"
          src={`${API_URL}/storyImages/${story.image}`}
          alt={story.title}
          onError={(e) => (e.target.src = "/defaultImage.png")} // fallback
        />

        <div className="story-content-wrapper">
          <h5 className="story-title">{truncateText(story.title, 76)}</h5>

          <p
            className="story-text"
            dangerouslySetInnerHTML={{
              __html: truncateText(story.content, 73),
            }}
          />

          <p className="story-createdAt">{editDate(story.createdAt)}</p>
        </div>
      </Link>
    </div>
  );
};

export default Story;
