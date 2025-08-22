// 




import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../../Css/DetailStory.css";
import Loader from "../GeneralScreens/Loader";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit, FiArrowLeft } from "react-icons/fi";
import { BsBookmarkPlus, BsBookmarkFill, BsThreeDots } from "react-icons/bs";
import CommentSidebar from "../CommentScreens/CommentSidebar";
import DOMPurify from "dompurify"; // ✅ sanitize HTML

const DetailStory = () => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [activeUser, setActiveUser] = useState({});
  const [story, setStory] = useState({});
  const [storyLikeUser, setStoryLikeUser] = useState([]);
  const [sidebarShowStatus, setSidebarShowStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const slug = useParams().slug;
  const [storyReadListStatus, setStoryReadListStatus] = useState(false);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getDetailStory = async () => {
      setLoading(true);
      let user = {};

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/private`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        user = data.user;
        setActiveUser(user);
      } catch {
        setActiveUser({});
      }

      try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/story/${slug}`, { activeUser: user });

        setStory(data.data);
        setLikeStatus(data.likeStatus);
        setLikeCount(data.data.likeCount);
        setStoryLikeUser(data.data.likes);

        const storyId = data.data._id;
        setStoryReadListStatus(user.readList?.includes(storyId) || false);
      } catch {
        setStory({});
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };

    getDetailStory();
  }, [slug, navigate]);

  const handleLike = async () => {
    setLikeStatus((prev) => !prev); // ✅ optimistic update

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/story/${slug}/like`,
        { activeUser },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setLikeCount(data.data.likeCount);
      setStoryLikeUser(data.data.likes);
    } catch {
      localStorage.removeItem("authToken");
      navigate("/");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Do you want to delete this post?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/story/${slug}/delete`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const editDate = (createdAt) => {
    const d = new Date(createdAt);
    return d.toLocaleString("en", { month: "short" }) + " " + d.getDate();
  };

  const addStoryToReadList = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/${slug}/addStoryToReadList`,
        { activeUser },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setStoryReadListStatus(data.status);
      document.getElementById("readListLength").textContent =
        data.user.readListLength;
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="Inclusive-detailStory-page">
      <div className="top_detail_wrapper">
        <Link to={"/"}>
          <FiArrowLeft />
        </Link>
        <h5>{story.title}</h5>

        <div className="story-general-info">
          <ul>
            {story.author && (
              <li className="story-author-info">
                <img
                  src={`${API_URL}/userPhotos/${story.author.photo}`}
                  alt={story.author.username}
                  onError={(e) => (e.target.src = "/userPhotos/default.png")}
                />
                <span className="story-author-username">
                  {story.author.username}
                </span>
              </li>
            )}
            <li className="story-createdAt">{editDate(story.createdAt)}</li>
            <b>-</b>
            <li className="story-readtime">{story.readtime} min read</li>
          </ul>

          {activeUser.username && (
            <div className="comment-info-wrap">
              <i onClick={() => setSidebarShowStatus(!sidebarShowStatus)}>
                <FaRegComment />
              </i>
              <b className="commentCount">{story.commentCount}</b>
            </div>
          )}

          {activeUser && story.author?._id === activeUser._id && (
            <div className="top_story_transactions">
              <Link className="editStoryLink" to={`/story/${story.slug}/edit`}>
                <FiEdit />
              </Link>
              <span className="deleteStoryLink" onClick={handleDelete}>
                <RiDeleteBin6Line />
              </span>
            </div>
          )}
        </div>
      </div>

      <CommentSidebar
        slug={slug}
        sidebarShowStatus={sidebarShowStatus}
        setSidebarShowStatus={setSidebarShowStatus}
        activeUser={activeUser}
      />

      <div className="story-content">
        <div className="story-banner-img">
          <img
            src={`${API_URL}/storyImages/${story.image}`}
            alt={story.title}
            onError={(e) => (e.target.src = "/defaultImage.png")}
          />
        </div>

        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(story.content),
          }}
        />
      </div>

      {activeUser.username && (
        <div className="fixed-story-options">
          <ul>
            <li>
              <i onClick={handleLike}>
                {likeStatus ? <FaHeart color="#0063a5" /> : <FaRegHeart />}
              </i>
              <b
                className="likecount"
                style={{
                  color: likeStatus ? "#0063a5" : "rgb(99, 99, 99)",
                }}
              >
                {likeCount}
              </b>
            </li>

            <li>
              <i onClick={() => setSidebarShowStatus(!sidebarShowStatus)}>
                <FaRegComment />
              </i>
              <b className="commentCount">{story.commentCount}</b>
            </li>
          </ul>

          <ul>
            <li>
              <i onClick={addStoryToReadList}>
                {storyReadListStatus ? (
                  <BsBookmarkFill color="#0205b1" />
                ) : (
                  <BsBookmarkPlus />
                )}
              </i>
            </li>

            <li className="BsThreeDots_opt">
              <i>
                <BsThreeDots />
              </i>
              {story.author?._id === activeUser._id && (
                <div className="delete_or_edit_story">
                  <Link
                    className="editStoryLink"
                    to={`/story/${story.slug}/edit`}
                  >
                    <p>Edit Story</p>
                  </Link>
                  <div className="deleteStoryLink" onClick={handleDelete}>
                    <p>Delete Story</p>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailStory;
