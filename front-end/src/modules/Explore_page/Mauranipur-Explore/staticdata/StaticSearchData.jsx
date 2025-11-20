import { staticDestinations } from "./StaticDestinations";


export const staticSearchData = [
  ...staticDestinations.map((item) => ({
    title: item.name,
    category: item.type,
    slug: item.slug,
    image: item.img,
    description: item.desc,
    source: "static",
  })),
]