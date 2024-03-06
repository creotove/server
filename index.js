import dotenv from "dotenv";
dotenv.config();
import express from "express";
import adminRoutes from "./routes/admin.js";
import studentRoutes from "./routes/student.js";
import teacherRoutes from "./routes/teacher.js";
import userRoutes from "./routes/user.js";
import publisherRoutes from "./routes/publisher.js";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
connectDB();
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/user", userRoutes);
app.use("/publisher", publisherRoutes);
const html = `
<body bgColor='black' style='color:white;font-size:5rem;display:flex;justify-content:center; align-items:center;' >Api is Running...</body>
`;
app.get("/", (req, res) => {
  res.send(html);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT} \n http://localhost:${PORT}`);
});
