import jwt from "jsonwebtoken";

const getUserIdFromToken = (token: string): string => {
  const decoded = jwt.verify(token, "your_jwt_secret") as { id: string };
  return decoded.id;
};

export default getUserIdFromToken;
