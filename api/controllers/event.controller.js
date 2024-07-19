import createError from "http-errors";
import Event from "../models/Event.model.js";
import User from "../models/User.model.js";

export const createEvent = async (req, res, next) => {
  const tokenUserId = req.user.id;

  const {
    title,
    description,
    eventType,
    startDate,
    endDate,
    location,
    isPaid,
  } = req.body;

  let foundUser;

  try {
    foundUser = await User.findById(tokenUserId);
  } catch {
    return next(createError(500, "Server error"));
  }

  if (!foundUser) {
    return next(createError(403, "Not authorized"));
  } else {
    try {
      const newEvent = await Event.create({
        title,
        description,
        eventType,
        startDate,
        endDate,
        location,
        isPaid,
        createdBy: foundUser._id,
      });

      // await newEvent.populate("createdBy", {
      //   _id: 1,
      //   username: 1,
      //   email: 1,
      // });

      await User.findByIdAndUpdate(tokenUserId, {
        $push: { events: newEvent._id },
      });

      res.status(200).json(newEvent);
    } catch {
      next(createError(500, "Server error"));
    }
  }
};

// think of if we need field hostedEvents and events splitted

export const editEvent = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.user.id;

  const {
    title,
    description,
    eventType,
    startDate,
    endDate,
    location,
    isPaid,
  } = req.body;

  let foundEvent;

  try {
    foundEvent = await Event.findById(id);
  } catch {
    return next(createError(500, "Server error"));
  }

  if (!foundEvent) {
    return next(createError(404, "There is no such event"));
  } else {
    if (foundEvent.createdBy.toString() !== tokenUserId) {
      return next(createError(403, "Sorry, you are not Host of this event"));
    } else {
      try {
        const options = {
          new: true,
          runValidators: true,
        };

        const updatedEvent = await Event.findByIdAndUpdate(
          id,
          {
            title,
            description,
            eventType,
            startDate,
            endDate,
            location,
            isPaid,
          },
          options
        );

        res.status(200).json(updatedEvent);
      } catch {
        next(createError(500, "Server error"));
      }
    }
  }
};

export const deleteEvent = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.user.id;

  let foundEvent;

  try {
    foundEvent = await Event.findById(id);
  } catch {
    return next(createError(500, "Server error"));
  }

  if (!foundEvent) {
    return next(createError(404, "There is no such event"));
  } else {
    if (foundEvent.createdBy.toString() !== tokenUserId) {
      return next(createError(403, "Sorry, you are not Host of this event"));
    } else {
      try {
        const options = {
          new: true,
          runValidators: true,
        };

        const deletedEvent = await Event.findByIdAndUpdate(
          id,
          { deletedAt: new Date() },
          options
        );

        const foundUser = await User.findById(tokenUserId);
        const eventsToRemain = foundUser.events.filter(
          (event) => event.toString() !== deletedEvent.id
        );
        await User.findByIdAndUpdate(tokenUserId, {
          $set: { events: eventsToRemain },
        });

        res.json({
          message: `${deletedEvent.title} was deleted`,
        });
      } catch {
        next(createError(500, "Server error"));
      }
    }
  }
};

export const joinEvent = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.user.id;
  let foundUser;
  let foundEvent;

  try {
    foundEvent = await Event.findById(id);
  } catch (error) {
    return next(createError(500, "Server error"));
  }

  if (!foundEvent) {
    return next(createError(404, "There is no such event"));
  } else {
    const isParticipant = foundEvent.participants.find(
      (participant) => participant.toString() === tokenUserId
    );
    if (isParticipant) {
      next(createError(409, "You already participating in this event"));
    } else {
      const options = {
        new: true,
        runValidators: true,
      };

      const participateInEvent = await Event.findByIdAndUpdate(
        id,
        {
          $push: { participants: tokenUserId },
        },
        options
      );

      await participateInEvent.populate("participants");

      await User.findByIdAndUpdate(tokenUserId, {
        $push: { events: participateInEvent.id },
      });

      res.status(200).json(participateInEvent);
    }
  }
};

export const declineEvent = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.user.id;
  let foundEvent;
  let foundUser;

  try {
    foundEvent = await Event.findById(id);
  } catch (error) {
    return next(createError(500, "Server error"));
  }

  if (!foundEvent) {
    return next(createError(404, "There is no such event"));
  } else {
    const isParticipant = foundEvent.participants.find(
      (participant) => participant.toString() === tokenUserId
    );

    if (!isParticipant) {
      next(createError(409, "You are not participating in this event"));
    } else {
      const options = {
        new: true,
        runValidators: true,
      };

      const event = await Event.findById(id);
      const newListOfParticipants = event.participants.filter(
        (participant) => participant.toString() !== tokenUserId
      );

      const updatedEvent = await Event.findByIdAndUpdate(
        id,
        {
          $set: { participants: newListOfParticipants },
        },
        options
      );

      await updatedEvent.populate("participants");

      foundUser = await User.findById(tokenUserId);
      const filteredEventsOfUser = foundUser.events.filter(
        (event) => event.toString() !== id
      );

      await User.findByIdAndUpdate(tokenUserId, {
        $set: { events: filteredEventsOfUser },
      });

      res.status(200).json(updatedEvent);
    }
  }
};

export async function getAllEvents(req, res, next) {
  try {
    const allEvents = await Event.find();

    const populatedEvents = await Promise.all(
      allEvents
        .filter((event) => event.deletedAt === null)
        .map(async (x) => {
          await x.populate("createdBy", {
            fullName: 1,
            profilePic: 1,
            _id:0
          });

          // await x.populate("likes", { fullName: 1, _id: 0 });
          return x; // return the populated event
        })
    );
    res.json(populatedEvents);
  } catch {
    next(createError(500, "Server error"));
  }
}

export async function getUserEvents(req, res, next) {
  const { username } = req.params;

  try {
    const foundUser = await User.findOne({ username });
    console.log(foundUser._id);
    const oneUserEvents = await Event.find({ createdBy: foundUser._id });

    const populatedOneUserEvents = await Promise.all(
      oneUserEvents
        .filter((event) => event.deletedAt === null)
        .map(async (x) => {
          await x.populate("createdBy", {
            fullName: 1,
            profilePic: 1,
          });
          return x;
        })
    );

    res.json(populatedOneUserEvents);
  } catch {
    next(createError(500, "Server error"));
  }
}

// export async function getUserEvents(req, res, next) {
//   const { username } = req.params;

//   try {
//     const foundUser = await User.findOne({ username });
//     console.log(foundUser._id);
//     const oneUserEvents = await Event.find({ createdBy: foundUser._id });

//     res.json(oneUserEvents);
//   } catch {
//     next(createError(500, "Server error"));
//   }
// }

// export const buyTicket = (req,res,next) => {

// }
