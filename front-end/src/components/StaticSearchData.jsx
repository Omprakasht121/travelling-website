import { staticDestinations } from "../modules/Explore_page/Mauranipur-Explore/staticdata/StaticDestinations";
import { Destinations } from "../modules/landing_page/staticdata/ExploreStaticData";

export const staticSearchData = [
  ...staticDestinations.map((item) => ({
    title: item.name,
    category: item.type,
    slug: item.slug,
    image: item.img,
    description: item.desc,
    source: "static",
  })),
  ...Destinations.map((item) => ({
    title: item.name,
    category: item.type,
    slug: item.slug,
    image: item.img,
    description: item.desc,
    source: "static",
  })),

]