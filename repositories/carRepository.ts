import { CarsModel } from "../models/car";

const carRepository = {
  create(createArgs: CarsModel) {
    return CarsModel.query().insert(createArgs);
  },

  update(id: string, updateArgs: CarsModel) {
    return CarsModel.query().findById(id).patch(updateArgs);
  },

  delete(id: string, deleteArgs: CarsModel) {
    // return CarsModel.query().deleteById(id);

    return CarsModel.query().findById(id).patch(deleteArgs);
  },

  find(id: string) {
    return CarsModel.query().findById(id);
  },

  findAll() {
    return CarsModel.query();
  },

  getTotalCarsModel() {
    return CarsModel.query().resultSize();
  },
};

export default carRepository;
