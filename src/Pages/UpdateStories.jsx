import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStories = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState({});
  const [path, setPath] = useState({});
  const [image, setImage] = useState({});

  async function fetchStories() {
    await axios
      .get(
        `http://localhost:4000/api/admin-panel/stories/read-story-by-id/${_id}`
      )
      .then((res) => {
        if (res.status === 200) setStory(res.data.data);
        setPath(res.data.filename);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred");
      });
  }

  async function handleStoryUpdate(e) {
    e.preventDefault();
    await axios
      .put(
        `http://localhost:4000/api/admin-panel/stories/update-story/${_id}`,
        e.target
      )
      .then((res) => {
        if (res.status === 200) alert("Story Updated.");
        navigate("/dashboard/stories/view-story");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred");
      });
  }

  useEffect(() => {
    fetchStories();
  }, []);
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] text-[#303640] border-b rounded-[10px_10px_0_0] p-[8px_16px] text-[20px] font-bold">
        Update Stories
      </span>
      <div className="w-[90%] mx-auto">
        <form method="post" onSubmit={handleStoryUpdate}>
          <div className="w-full my-[10px] ">
            <label htmlFor="story_name" className="block text-[#303640]">
              Story Name
            </label>
            <input
              type="text"
              id="story_name"
              name="name"
              value={story.name}
              onChange={(e) => setStory({ ...story, name: e.target.value })}
              placeholder="Story Name"
              className="w-full input p-2 border my-[10px] rounded-[5px]"
            />
          </div>
          <div className="w-full my-[10px] ">
            <div className="object-contain w-[200px]">
              <img
                src={image.image ? image.image : `${path}/${story.image}`}
                alt={`${story.name}`}
                className="w-[200px]"
              />
            </div>
            <label htmlFor="story_img" className="block text-[#303640]">
              Image
            </label>
            <input
              type="file"
              id="story_img"
              name="image"
              onChange={(e) => {
                const [file] = e.target.files;
                const name = e.target.name;
                if (file) {
                  const reader = new FileReader();
                  reader.onload = function () {
                    setImage({ ...image, [name]: this.result });
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
              className="w-full input category border my-[10px] rounded-[5px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <div className="object-contain w-[200px]">
              <img
                src={image.banner ? image.banner : `${path}/${story.banner}`}
                alt={`${story.name}`}
                className="w-[200px]"
              />
            </div>
            <label htmlFor="story_banner_img" className="block text-[#303640]">
              Banner Image
            </label>
            <input
              type="file"
              id="story_banner_img"
              name="banner"
              onChange={(e) => {
                const [file] = e.target.files;
                const name = e.target.name;
                if (file) {
                  const reader = new FileReader();
                  reader.onload = function () {
                    setImage({ ...image, [name]: this.result });
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
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
              value={story.description}
              onChange={(e) =>
                setStory({ ...story, description: e.target.value })
              }
              placeholder="Description"
              className="w-full input p-2 category border my-[10px] rounded-[5px]"
            />
          </div>
          {/* <div className="w-full my-[10px]">
            <label htmlFor="status" className="mr-[20px]">
              Status
            </label>
            <input
              type="radio"
              value="0"
              className="mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
              value="1"
              className="mx-[10px] accent-[#5351c9] cursor-pointer"
              checked
            />
            <span>Hide</span>
          </div> */}
          <div className="w-full my-[30px] p-[10px_0px]">
            <button className="w-[200px] rounded-md bg-[#5351c9] text-white p-2">
              Update Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStories;
