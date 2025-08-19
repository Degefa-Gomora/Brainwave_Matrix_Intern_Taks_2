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
const imageupload = require("../Helpers/Libraries/imageUpload");

const {
  getAccessToRoute,
  getAdminAccess,
} = require("../Middlewares/Authorization/auth");
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

// Public route - anyone can get all stories
router.get("/getAllStories", getAllStories);

// Authenticated user route - a logged-in user can add a story
router.post(
  "/addstory",
  [getAccessToRoute, imageupload.single("image")],
  addStory
);

// Public route - anyone can see a story's details
router.post("/:slug", checkStoryExist, detailStory);

// Authenticated user route - a logged-in user can like a story
router.post("/:slug/like", [getAccessToRoute, checkStoryExist], likeStory);

// Admin route - only a logged-in admin can edit a story page
// Note: This assumes only admins should see the edit page. If not, you might need a different middleware.
router.get(
  "/editStory/:slug",
  [getAccessToRoute, getAdminAccess, checkStoryExist, checkUserAndStoryExist],
  editStoryPage
);

// Admin route - only a logged-in admin can edit a story
router.put(
  "/:slug/edit",
  [
    getAccessToRoute,
    getAdminAccess,
    checkStoryExist,
    checkUserAndStoryExist,
    imageupload.single("image"),
  ],
  editStory
);

// Admin route - only a logged-in admin can delete a story
router.delete(
  "/:slug/delete",
  [getAccessToRoute, getAdminAccess, checkStoryExist, checkUserAndStoryExist],
  deleteStory
);

module.exports = router;