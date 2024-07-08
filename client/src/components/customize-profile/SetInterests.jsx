import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

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

function SetInterests() {
  const [userInterests, setUserInterests] = useState([]);

  return (
    <div className="flex flex-col justify-center items-center">
      <span className="flex items-center justify-center ">
        {userInterests.map((x, i) => (
          <div key={i} className=" m-4 flex gap-2 items-center justify-center border-blue-400">
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
        ))}
      </span>

      <select
        className="select select-bordered w-full max-w-xs"
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
    </div>
  );
}

export default SetInterests;
