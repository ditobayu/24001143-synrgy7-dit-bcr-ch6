import { UsersModel } from "../models/users";

const userRepository = {
  create(createArgs: Partial<UsersModel>) {
    return UsersModel.query().insert(createArgs);
  },

  update(id: string, updateArgs: UsersModel) {
    return UsersModel.query().findById(id).patch(updateArgs);
  },

  delete(id: string) {
    return UsersModel.query().deleteById(id);
  },

  find(id: string) {
    return UsersModel.query().findById(id);
  },

  findByEmail(email: string) {
    return UsersModel.query().findOne({ email });
  },

  findAll() {
    return UsersModel.query();
  },

  getTotalUsersModel() {
    return UsersModel.query().resultSize();
  },
};

export default userRepository;
