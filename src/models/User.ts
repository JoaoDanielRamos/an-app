import mongoose, { type Document, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true },
);

// Prevent overwriting the model if it's already compiled
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
