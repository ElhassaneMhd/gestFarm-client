import { axiosFetch } from ".";

export const getAllSheep = async () => await axiosFetch("api/sheep");

export const getAvailableSheep = async (page, limit) =>
  await axiosFetch(`api/public/sheep/available?page=${page}&limit=${limit}`);

export const getPaginateSheep = async (page, limit) =>
  await axiosFetch(`api/sheep/paginate?page=${page}&limit=${limit}`);

export const getSheep = async (number) =>
  !number ? null : await axiosFetch(`api/public/sheep/${number}`);

export const addSheep = async (data) =>
  await axiosFetch("api/sheep", "POST", { ...data });

export const updateSheep = async (data) =>
  await axiosFetch(`api/sheep/${data.data.id}`, "PUT", { ...data.data });

export const deleteSheep = async (id) =>
  await axiosFetch(`api/sheep/${id}`, "DELETE");

export const multipleDeleteSheep = async (ids) =>
  await axiosFetch(`api/sheep/delete/multiple`, "POST", [...ids]);

export const getSheepByField = async (field, value) =>
  await axiosFetch(`sheep/search/${field}?${field}=${value}`);
