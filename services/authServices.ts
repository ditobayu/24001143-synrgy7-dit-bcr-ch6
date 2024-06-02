import { UsersModel } from "../models/users";
import userRepository from "../repositories/userRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SALT = 10;

const encryptPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, SALT);
  return hashedPassword;
};

const checkPassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const authService = {
  async register(email: string, name: string, password: string, role: string) {
    const hashedPassword = await encryptPassword(password);
    const user = {
      email,
      password: hashedPassword,
      name,
      role,
    };
    return userRepository.create(user);
  },

  async authenticate(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Email not found");
    }
    const isMatch = await checkPassword(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid username or password");
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "your_jwt_secret"
    );

    const { password: pwd, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  },

  async whoami(token: string) {
    const decoded = jwt.verify(token, "your_jwt_secret") as { id: number };
    const user = await userRepository.find(decoded.id.toString());

    const { password: pwd, ...userWithoutPassword } = user!;

    return { token, user: userWithoutPassword };
  },
};

export default authService;
