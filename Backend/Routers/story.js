// const express = require("express")
// const imageupload = require("../Helpers/Libraries/imageUpload");

// const { getAccessToRoute } = require("../Middlewares/Authorization/auth");
// const {addStory,getAllStories,detailStory,likeStory, editStory, deleteStory, editStoryPage } = require("../Controllers/story")
// const { checkStoryExist, checkUserAndStoryExist } = require("../Middlewares/database/databaseErrorhandler");

// const router = express.Router() ;

// router.post("/addstory" ,[getAccessToRoute, imageupload.single("image")],addStory)


// router.post("/:slug", checkStoryExist, detailStory)

// router.post("/:slug/like",[getAccessToRoute,checkStoryExist] ,likeStory)

// router.get("/editStory/:slug",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist] , editStoryPage)

// router.put("/:slug/edit",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist, imageupload.single("image")] ,editStory)

// router.delete("/:slug/delete",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist] ,deleteStory)

// router.get("/getAllStories",getAllStories)


// module.exports = router


const express = require("express");
const imageUpload = require("../Helpers/Libraries/imageUpload");

const { getAccessToRoute } = require("../Middlewares/Authorization/auth");
const {
  addStory,
  getAllStories,
  detailStory,
  likeStory,
  editStory,
  deleteStory,
  editStoryPage,
} = require("../Controllers/story");

const {
  checkStoryExist,
  checkUserAndStoryExist,
} = require("../Middlewares/database/databaseErrorhandler");

const router = express.Router();

// Add new story
router.post(
  "/addstory",
  [getAccessToRoute, imageUpload.single("image")],
  addStory
);

// Get story details by slug
router.post("/:slug", checkStoryExist, detailStory);

// Like/unlike a story
router.post("/:slug/like", [getAccessToRoute, checkStoryExist], likeStory);

// Get story for editing (edit page)
router.get(
  "/editStory/:slug",
  [getAccessToRoute, checkStoryExist, checkUserAndStoryExist],
  editStoryPage
);

// Edit story
router.put(
  "/:slug/edit",
  [
    getAccessToRoute,
    checkStoryExist,
    checkUserAndStoryExist,
    imageUpload.single("image"),
  ],
  editStory
);

// Delete story
router.delete(
  "/:slug/delete",
  [getAccessToRoute, checkStoryExist, checkUserAndStoryExist],
  deleteStory
);

// Get all stories with pagination & search
router.get("/getAllStories", getAllStories);

module.exports = router;
