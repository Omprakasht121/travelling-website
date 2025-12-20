import { backendURL } from "./constants";

export const makeImageUrl = (imgPath) => {
  if (!imgPath) return null;
  if (imgPath.startsWith("/")) return `${backendURL}${imgPath}`;
  if (imgPath.startsWith("uploads")) return `${backendURL}/${imgPath}`;
  if (/^https?:\/\//.test(imgPath)) return imgPath;
  return `${import.meta.env.BASE_URL}${imgPath}`;
};
