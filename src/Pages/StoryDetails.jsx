import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const StoryDetails = () => {
  const navigate = useNavigate();

  async function handleStories(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/api/admin-panel/stories/add-story", e.target)
      .then((res) => {
        if (res.status === 200) alert("Story added Successfully.");
        navigate("/dashboard/stories/view-story");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred");
      });
  }
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] text-[#303640] border-b rounded-[10px_10px_0_0] p-[8px_16px] text-[20px] font-bold">
        Our Stories
      </span>
      <div className="w-[90%] mx-auto">
        <form method="post" onSubmit={handleStories}>
          <div className="w-full my-[10px] ">
            <label htmlFor="story_name" className="block text-[#303640]">
              Story Name
            </label>
            <input
              type="text"
              id="story_name"
              name="name"
              placeholder="Story Name"
              className="w-full input p-2 border my-[10px] rounded-[5px]"
            />
          </div>
          <div className="w-full my-[10px] ">
            <label htmlFor="story_img" className="block text-[#303640]">
              Image
            </label>
            <input
              type="file"
              id="story_img"
              name="image"
              className="w-full input category border my-[10px] rounded-[5px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="story_banner_img" className="block text-[#303640]">
              Banner Image
            </label>
            <input
              type="file"
              id="story_banner_img"
              name="banner"
              className="w-full input category border my-[10px] rounded-[5px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="story_desc" className="block text-[#303640]">
              Description
            </label>
            <textarea
              type="file"
              id="story_desc"
              name="description"
              placeholder="Description"
              className="w-full input p-2 category border my-[10px] rounded-[5px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="status" className="mr-[20px]">
              Status
            </label>
            <input
              type="radio"
              name="status"
              value={true}
              className="mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              value={false}
              className="mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[30px] p-[10px_0px]">
            <button className="w-[100px] rounded-md bg-[#5351c9] text-white p-2">
              Add Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoryDetails;
