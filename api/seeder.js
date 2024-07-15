import connect from "./libs/database.js";
import bcrypt from "bcrypt";
import User from "./models/User.model.js";
import Post from "./models/Post.model.js";
import Event from "./models/Event.model.js";

try {
  console.log("Attempting to seed db...");

  await connect();

  await User.deleteMany({});
  await Post.deleteMany({});
  await Event.deleteMany({});

  const password = "123456";
  const hashedPassword = await bcrypt.hash(password, 10);

  const mockUsers = [
    {
      username: "user1",
      email: "user1@test.test",
      password: `${hashedPassword}`,
      fullName: "user1",
    },
    {
      username: "user2",
      email: "user2@test.test",
      password: `${hashedPassword}`,
      fullName: "user2",
    },
    {
      username: "user3",
      email: "user3@test.test",
      password: `${hashedPassword}`,
      fullName: "user3",
    },
  ];

  await User.insertMany(mockUsers);
  const userArr = await User.find();
  console.log(userArr);

  const mockPosts = [
    {
      content: "First post of user1",
      createdBy: userArr[0]._id,
    },
    {
      content: "First post of user2",
      createdBy: userArr[1]._id,
    },
    {
      content: "First post of user3",
      createdBy: userArr[2]._id,
    },
    {
      content: "Second post of user1",
      createdBy: userArr[0]._id,
    },
    {
      content: "Second post of user2",
      createdBy: userArr[1]._id,
    },
    {
      content: "Second post of user3",
      createdBy: userArr[2]._id,
    },
  ];

  await Post.insertMany(mockPosts);
  const postsArr = await Post.find();

  for (let user of userArr) {
    for (let post of postsArr) {
      if (user._id.toString() === post.createdBy.toString()) {
        await User.findByIdAndUpdate(
          user._id.toString(),
          {
            $push: { posts: post._id },
          },
          {
            new: true,
          }
        )
      }
    }
  }

  const mockEvents = [
    {
      title: "First event of user1",
      description: "Event 1 of user1",
      eventType:["Art"],
      startDate: "02-08-2024",
      endDate: "03-08-2024",
      location: "Berlin",
      createdBy: userArr[0]._id,
    },
    {
      title: "First event of user2",
      description: "Event 1 of user2",
      eventType:["Sport"],
      startDate: "03-09-2024",
      endDate: "04-09-2024",
      location: "London",
      createdBy: userArr[1]._id,
    },
    {
      title: "First event of user3",
      description: "Event 1 of user3",
      eventType:["IT"],
      startDate: "04-10-2024",
      endDate: "05-10-2024",
      location: "Kyiv",
      createdBy: userArr[2]._id,
    },
    {
      title: "Second event of user1",
      description: "Event 2 of user1",
      eventType:["Concerts"],
      startDate: "05-11-2024",
      endDate: "06-11-2024",
      location: "Damascus",
      createdBy: userArr[0]._id,
    },
    {
      title: "Second event of user2",
      description: "Event 2 of user2",
      eventType:["Films"],
      startDate: "06-12-2024",
      endDate: "07-12-2024",
      location: "Leipzig",
      createdBy: userArr[1]._id,
    },
    {
      title: "Second event of user3",
      description: "Event 2 of user3",
      eventType:["Design"],
      startDate: "07-01-2025",
      endDate: "08-01-2025",
      location: "Dusseldorf",
      createdBy: userArr[2]._id,
    },
  ];

  await Event.insertMany(mockEvents);
  const eventsArr = await Event.find();

  for (let user of userArr) {
    for (let event of eventsArr) {
      if (user._id.toString() === event.createdBy.toString()) {
        await User.findByIdAndUpdate(
          user._id.toString(),
          {
            $push: { events: event._id },
          },
          {
            new: true,
          }
        )
      }
    }
  }
  console.log("DB seeded!");

  process.exit(0);
} catch (error) {
  console.log(error);

  process.exit(1);
}
