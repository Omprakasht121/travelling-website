import { staticDestinations } from "../modules/Explore_page/Mauranipur-Explore/staticdata/StaticDestinations";

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