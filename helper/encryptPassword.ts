import bcrypt from "bcryptjs";

const encryptPassword = async (password: string) => {
  const SALT = 10;

  const hashedPassword = await bcrypt.hash(password, SALT);
  return hashedPassword;
};

export default encryptPassword;
