const backendURL = import.meta.env.VITE_BASE_URL;

const getImagePath = (img, folder = "") => {
  if (!img) return "/fallback.jpg";

  if (img.startsWith("/uploads") || img.startsWith("uploads"))
    return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;

  if (img.startsWith("/gallery") || img.startsWith("gallery"))
    return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;

  if (img.startsWith("http")) return img;

  return `${import.meta.env.BASE_URL}${folder}${img}`;
};

export default getImagePath;
