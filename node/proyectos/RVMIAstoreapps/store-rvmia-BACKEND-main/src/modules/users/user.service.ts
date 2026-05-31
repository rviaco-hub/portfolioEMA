import { User } from "./user.model";

export const getUsers = () => User.find();
