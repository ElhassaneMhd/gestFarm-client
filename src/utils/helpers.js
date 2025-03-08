import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import { DateTime } from "luxon";
import {  PAGE_PERMISSIONS } from "./constants";

export const cn = (...inputs) => twMerge(clsx(inputs));

export const changeTitle = (title) => (document.title = title || "Loading...");

export const capitalize = (string) =>
  string?.charAt(0).toUpperCase() + string?.slice(1);

export function formatEmbeddedData(data, key) {
  return data?._embedded[key].map((e) => ({
    ...e,
    id: e._links.self.href.split("/").pop(),
  }));
}
//*------ Dates And Time
export const getIsoDate = (date) =>
  DateTime.fromISO(new Date(date).toISOString());

export const formatDate = (date, includeTime) => {
  if (!date) return null;
  return getIsoDate(date).toLocaleString(
    includeTime ? DateTime.DATETIME_MED : DateTime.DATE_FULL
  );
};

//*------ Object Helpers

export const objectDeepEquals = (a, b) => {
  if (!a && !b) return true;
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object") return false;
  if (a && b && Object.keys(a).length !== Object.keys(b).length) return false;

  for (const key in a) {
    if (!objectDeepEquals(a?.[key], b?.[key])) return false;
  }

  return true;
};

export const filterObject = (obj, keys, keysType) => {
  const filtered = {};
  for (const key in obj) {
    if (keysType === "include" && keys.includes(key)) filtered[key] = obj[key];
    if (keysType === "exclude" && !keys.includes(key)) filtered[key] = obj[key];
  }
  return filtered;
};

export const canAccessPage = (userPermissions, page) => {
  const requiredPermissions = PAGE_PERMISSIONS[page] || [];
  return requiredPermissions.every((perm) => userPermissions?.includes(perm));
};

export const getAccessiblePages = (userPermissions) => {
  return Object.keys(PAGE_PERMISSIONS).filter((page) =>
    canAccessPage(userPermissions, page)
  );
};
