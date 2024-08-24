import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

import { useParams } from "react-router-dom";

import { useAuthContext } from "../../contexts/authContext/AuthContext";

import toast from "react-hot-toast";


const interests = [
  { id: uuidV4(), value: "Sport" },
  { id: uuidV4(), value: "Yoga" },
  { id: uuidV4(), value: "Out door activities" },
  { id: uuidV4(), value: "Art" },
  { id: uuidV4(), value: "Photography" },
  { id: uuidV4(), value: "Writing" },
  { id: uuidV4(), value: "Music" },
  { id: uuidV4(), value: "Gaming" },
  { id: uuidV4(), value: "Languages" },
  { id: uuidV4(), value: "Science" },
  { id: uuidV4(), value: "Reading" },
  { id: uuidV4(), value: "Technology" },
  { id: uuidV4(), value: "IT" },
  { id: uuidV4(), value: "Programming" },
  { id: uuidV4(), value: "Traveling" },
  { id: uuidV4(), value: "Cooking" },
  { id: uuidV4(), value: "Volunteering" },
  { id: uuidV4(), value: "Films" },
  { id: uuidV4(), value: "Series" },
  { id: uuidV4(), value: "Dancing" },
  { id: uuidV4(), value: "Concerts" },
  { id: uuidV4(), value: "Theater" },
  { id: uuidV4(), value: "Literature" },
  { id: uuidV4(), value: "Landscaping" },
  { id: uuidV4(), value: "Design" },
  { id: uuidV4(), value: "Animals" },
];

function SetInterests({ dispatch, types, userReducerInterests, idParams }) {
  const [userInterests, setUserInterests] = useState([]);

  const { loggedInUser, updateUser } = useAuthContext();

  const { id } = useParams();

  async function handleSetInterests(e) {
    e.preventDefault();
    // dispatch({ type: types, payload: userInterests });

    try {
      const settings = {
        method: "PATCH",
        body: JSON.stringify({ interests: userInterests }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `http://localhost:5555/createProfile/${idParams}/interests`,
        settings
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      // console.log("data--> ", data);
      await updateUser(data);
      toast.success("Interests added")

    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="flex flex-col justify-center md:items-start">
      <span className="flex items-center justify-center   max-w-[100em] overflow-x-auto max-h-[57px]">
        {userInterests.length > 0 ? (
          userInterests.map((x, i) => (
            <div
              key={i}
              className=" m-4 flex gap-2 items-center  border-blue-400 min-w-fit" 
            >
              <span>{x}</span>
              <button
                className=" bg-red-200 text-white rounded-full w-4 h-4 flex items-center justify-center"
                onClick={() => {
                  setUserInterests(userInterests.filter((y) => y !== x));
                }}
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <div className="h-[56px]"></div>
        )}
      </span>

      <form
        onSubmit={handleSetInterests}
        className="flex flex-col justify-center w-full items-start"
      >
        <select
          className="select select-bordered w-full "
          // value={userInterests}
          onChange={({ target }) =>
            setUserInterests([...userInterests, target.value])
          }
        >
          {interests.map((x) => (
            <option
              key={x.id}
              value={x.value}
              disabled={userInterests.includes(x.value)}
            >
              {x.value}
            </option>
          ))}
        </select>
        <button type="submit" className="btn m-3">
          Add interests
        </button>
      </form>
    </div>
  );
}

export default SetInterests;
