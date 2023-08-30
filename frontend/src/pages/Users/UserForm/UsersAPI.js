import { deleteOne, fetchAll, patch, post } from "../../../config/APIrequest";

export const fetchAllUsers = (entity) => fetchAll(entity);
export const deleteOneUser = (entity, id) => deleteOne(entity, id);
export const createUser = (entity, data) => post(entity, data);
export const editUser = (entity, id, data) => patch(entity, id, data);
