import { axiosFetch } from ".";

export const getSales = async () => await axiosFetch("api/sales");

export const getPaginateSales = async (page, limit) =>
  await axiosFetch(`api/sales/paginate?page=${page}&limit=${limit}`);

export const getSale = async (id) =>
  !id ? null : await axiosFetch(`api/sales/${id}`);

export const addSale = async (data) =>
  await axiosFetch("api/sales", "POST", { ...data });

export const updateSale = async (data) =>
  await axiosFetch(`api/sales/${data.data.id}`, "PUT", { ...data.data });

export const deleteSale = async (id) =>
  await axiosFetch(`api/sales/${id}`, "DELETE");

export const multipleDeleteSale = async (ids) =>
  await axiosFetch(`api/sales/delete/multiple`, "POST", [...ids]);

export const getSaleByField = async (field, value) =>
  await axiosFetch(`api/sales/search/${field}?${field}=${value}`);
