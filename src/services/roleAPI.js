import { axiosFetch } from ".";

export const getRoles = async () => await axiosFetch("api/roles");

export const getPermissions = async () =>
  await axiosFetch("api/roles/permissions");

export const getPaginateRoles = async (page, limit) =>
  await axiosFetch(`api/roles/paginate?page=${page}&limit=${limit}`);

export const addRole = async (data) =>
  await axiosFetch("api/roles", "POST", { ...data });

export const updateRole = async (data) =>
  await axiosFetch(`api/roles/${data.data.id}`, "PUT", { ...data.data });
