// import SetEventType from "../components/feed-view/posts-events-switch/SetEventType"

import { Autocomplete, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext/AuthContext";

const eventTypes = [
  "Sport",
  "Yoga",
  "Outdoor activities",
  "Art",
  "Photography",
  "Writing",
  "Music",
  "Gaming",
  "Languages",
  "Science",
  "Reading",
  "Technology",
  "IT",
  "Programming",
  "Traveling",
  "Cooking",
  "Volunteering",
  "Films",
  "Series",
  "Dancing",
  "Concerts",
  "Theater",
  "Literature",
  "Landscaping",
  "Design",
  "Animals",
];

const CreateEvent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [tickets, setTickets] = useState({ quantity: "0", price: "0" });
  const nav = useNavigate();

  const { loggedInUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const eventType = formData.get("eventType");
    const location = formData.get("location");
    const isPaid = formData.get("isPaid");

    console.log(
      title,
      description,
      startDate,
      endDate,
      eventType,
      location,
      isPaid
    );

    try {
      const response = await fetch("http://localhost:5555/event/create", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          startDate,
          endDate,
          eventType,
          location,
          isPaid,
          tickets
        }),
        headers: {
          "Content-Type": "application/JSON",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      console.log(data);
      nav(`/${loggedInUser._id}/feed/${loggedInUser.username}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(tickets);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit}
        className="w-[80%] mx-auto my-20 flex flex-col items-center gap-12"
      >
        <label htmlFor="">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title of event..."
          className="outline"
        />
        <Autocomplete
          //   options={cities[selectedCountry.code] || []}
          options={eventTypes || []}
          getOptionLabel={(option) => option}
          // value={userLocation}
          // onChange={(event, newValue) => {
          //   dispatch({ type: types, payload: newValue });
          // }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type of Event"
              variant="outlined"
              name="eventType"
            />
          )}
        />
        <label htmlFor="">Start Date</label>
        <DateTimePicker
          name="startDate"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
        />
        <label htmlFor="">End Date</label>
        <DateTimePicker
          name="endDate"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
        />
        <label htmlFor="">Location</label>
        <input type="text" className="outline" name="location" />
        <label htmlFor="isPaid">Paid or Free</label>
        <select
          name="isPaid"
          id="isPaid"
          value={isPaid}
          onChange={(e) => setIsPaid(e.target.value)}
        >
          <option value={true}>Paid</option>
          <option value={false}>Free</option>
        </select>
        {isPaid && (
          <div>
            <label htmlFor="quantity">Quantity of tickets</label>
            <input type="text" name="quantity" value={tickets.quantity} onChange={(e)=> setTickets({...tickets, quantity: e.target.value})}/>
            <label htmlFor="price">Price per Ticket</label>
            <input type="text" name="price" value={tickets.price} onChange={(e)=> setTickets({...tickets, price: e.target.value})} />
          </div>
        )}
        <label htmlFor="">Description</label>
        <textarea
          name="description"
          id=""
          className="outline resize-none"
        ></textarea>
        <button type="submit">Create Event</button>
      </form>
    </LocalizationProvider>
  );
};

export default CreateEvent;
