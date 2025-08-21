



// import React, { useState, useEffect, useRef } from "react";
// import "../../Css/ImageBanner.css";

// const totalImages = 50;

// const ImageBanner = () => {
//   const [isHovering, setIsHovering] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(1);
//   const intervalRef = useRef(null);

//   // Use a state to track whether images have been preloaded
//   const [imagesLoaded, setImagesLoaded] = useState(false);

//   // Effect to preload all images
//   useEffect(() => {
//     const loadImage = (index) => {
//       return new Promise((resolve) => {
//         const paddedIndex = String(index).padStart(5, "0");
//         const img = new Image();
//         img.src = `/images/${paddedIndex}.png`;
//         img.onload = () => resolve();
//       });
//     };

//     const loadAllImages = async () => {
//       const promises = [];
//       for (let i = 1; i <= totalImages; i++) {
//         promises.push(loadImage(i));
//       }
//       await Promise.all(promises);
//       setImagesLoaded(true); // Set state to true once all images are loaded
//       console.log("All banner images have been preloaded!");
//     };

//     loadAllImages();
//   }, []); // Run this effect only once on component mount

//   // Effect to handle the animation interval, but only if images are loaded
//   useEffect(() => {
//     if (isHovering && imagesLoaded) {
//       intervalRef.current = setInterval(() => {
//         setCurrentImageIndex((prevIndex) => (prevIndex % totalImages) + 1);
//       }, 200);
//     } else {
//       clearInterval(intervalRef.current);
//     }

//     return () => clearInterval(intervalRef.current);
//   }, [isHovering, imagesLoaded]); // Re-run effect when isHovering or imagesLoaded changes

//   const handleMouseEnter = () => {
//     setIsHovering(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovering(false);
//   };

//   const paddedIndex = String(currentImageIndex).padStart(5, "0");
//   const imageUrl = `/images/${paddedIndex}.png`;

//   return (
//     <div
//       className="banner-container"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div
//         className="image-banner"
//         style={{ backgroundImage: `url(${imageUrl})` }}
//       ></div>
//     </div>
//   );
// };

// export default ImageBanner;


// video
import React, { useState, useRef } from "react";
import "../../Css/ImageBanner.css";

const ImageBanner = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      // Use the promise returned by video.play() to handle potential errors
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          // This silently handles the AbortError without logging it
          if (error.name === 'AbortError') {
            // Do nothing, as this is expected behavior
          } else {
            // Log other, unexpected errors
            console.error('Video playback error:', error);
          }
        });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      // Optional: Rewind the video on mouse leave
      // videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="banner-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="image-banner" // Keeping the same class for potential shared styles
        loop // Optional: Loops the video
        muted // Important for autoplay in many browsers
      >
        <source src={videoSrc} type="video/mp4" />
        {/* You can add more <source> elements for different video formats (e.g., WebM) */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default ImageBanner;