import { CarsModel } from "../models/car";
import carRepository from "../repositories/carRepository";

const carService = {
  create(requestBody: CarsModel) {
    return carRepository.create(requestBody);
  },

  update(id: string, requestBody: CarsModel, updaterId: string) {
    requestBody.updated_by = updaterId;
    requestBody.updated_at = new Date();
    return carRepository.update(id, requestBody);
  },

  delete(id: string, requestBody: CarsModel, deleterId: string) {
    requestBody.deleted_by = deleterId;
    requestBody.deleted_at = new Date();
    return carRepository.delete(id, requestBody);
  },

  async list() {
    try {
      const cars = await carRepository.findAll();
      const carCount = await carRepository.getTotalCarsModel();

      return {
        data: cars,
        count: carCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id: string) {
    return carRepository.find(id);
  },
};

export default carService;
