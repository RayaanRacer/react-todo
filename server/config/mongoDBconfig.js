import mongoose from "mongoose";

const configDB = (URI) => {
  mongoose
    .connect(URI)
    .then(() => console.log("Database connected succesfully"))
    .catch((err) => console.log("Error :", err));
};
export default configDB;
