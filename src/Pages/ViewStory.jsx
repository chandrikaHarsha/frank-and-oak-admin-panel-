import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewStory = () => {
  const [stories, setStories] = useState([]);
  const [filename, setFilename] = useState({});
  const [ifChecked, setIfChecked] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const fetchStories = async () => {
    await axios
      .get("http://localhost:4000/api/admin-panel/stories/read-stories")
      .then((res) => {
        if (res.status === 200) {
          setStories(res.data.data);
          setFilename(res.data.filename);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred");
      });
  };
  const handleMultiDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    await axios
      .put("http://localhost:4000/api/admin-panel/stories/multi-delete",{_ids:ifChecked})
      .then((res) => {
        if (res.status === 200) alert("deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred");
      });
  };
  const handleAllSelect = (e) => {
    const allIds = stories.map((v) => v._id);
    if (e.target.checked) {
      setIfChecked(allIds);
      setSelectAll(true);
    } else {
      setIfChecked([]);
      setSelectAll(false);
    }
  };

  useEffect(() => {
    setSelectAll(stories.length === ifChecked.length && stories.length !== 0);
    fetchStories();
  }, [stories]);

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block p-[8px_16px] text-[20px] text-[#303640] font-bold bg-[#f8f8f9] border-b rounded-[10px_10px_0_0]">
        View Stories
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button
                  className="bg-red-500 text-white p-[4px_8px] rounded-md font-[200] mr-[5px]"
                  onClick={handleMultiDelete}
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  checked={selectAll}
                  onClick={handleAllSelect}
                  id="deleteAll"
                  className="accent-[#5351c9] cursor-pointer input"
                />
              </th>
              <th>Sno</th>
              <th>Story Name</th>
              <th>Image</th>
              <th>Banner</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stories.length > 0
              ? stories.map((v, i) => (
                  <StoryRow
                    stories={v}
                    index={i}
                    key={i}
                    filename={filename}
                    setIfChecked={setIfChecked}
                    ifChecked={ifChecked}
                  />
                ))
              : "No Story added yet"}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStory;

function StoryRow({ stories, index, filename, setIfChecked, ifChecked }) {
  const [show, setShow] = useState(false);

  const handleStatusUpdate = async (e) => {
    const newStatus = e.target.textContent === "Active" ? false : true;
    await axios
      .put(
        `http://localhost:4000/api/admin-panel/stories/update-status/${e.target.value}`,
        { newStatus }
      )
      .then((res) => {
        if (res.status === 200) alert("Status updated successfully.");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  const handleSingleDelete = async (_id) => {
    if (!window.confirm("Are you sure?")) return;
    await axios
      .delete(
        `http://localhost:4000/api/admin-panel/stories/delete-story/${_id}`
      )
      .then((res) => {
        if (res.status === 200) alert("Story deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  const handleSelectedIds = (e) => {
    if (e.target.checked) {
      setIfChecked([...ifChecked, e.target.value]);
    } else {
      setIfChecked((prev) => prev.filter((id) => id !== e.target.value));
    }
  };

  return (
    <tr className="border-b">
      <td>
        <input
          type="checkbox"
          name="delete"
          checked={ifChecked.includes(stories._id)}
          value={stories._id}
          onClick={handleSelectedIds}
          id="delete"
          className="accent-[#5351c9] cursor-pointer input"
        />
      </td>
      <td>{index + 1}</td>
      <td>{stories.name}</td>
      <td className="object-contain p-1">
        <img
          src={`${filename}/${stories.image}`}
          alt="story img"
          width={80}
          height={80}
          className="rounded-[5px]"
        />
      </td>
      <td className="p-1 object-contain">
        <img
          src={`${filename}/${stories.banner}`}
          alt="story img"
          width={150}
          height={150}
          className="rounded-[5px]"
        />
      </td>
      <td className="w-[200px] p-2 text-justify tracking-tighter">
        {stories.description.length > 100 && !show
          ? stories.description.slice(0, 100)
          : stories.description}
        <span
          className={
            stories.description.length < 100
              ? "hidden"
              : "font-bold cursor-pointer"
          }
          onClick={() => setShow(!show)}
        >
          {show ? "Show less" : "Read More"}
        </span>
      </td>
      <td>
        <MdDelete
          className="my-[5px] text-red-500 cursor-pointer inline"
          onClick={() => handleSingleDelete(stories._id)}
        />{" "}
        |{" "}
        <Link to={`/dashboard/stories/update-stories/${stories._id}`}>
          <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
        </Link>
      </td>
      <td>
        <button
          className={`p-[4px_10px] text-white rounded-md ${
            stories.status ? "bg-green-500" : "bg-red-500"
          }`}
          onClick={handleStatusUpdate}
          value={stories._id}
        >
          {stories.status ? "Active" : "Inactive"}
        </button>
      </td>
    </tr>
  );
}
