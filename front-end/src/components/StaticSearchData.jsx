
import staticDestination from "../modules/Explore_page/services/Destinations/staticDestination";
import { Destinations } from "../modules/landing_page/staticdata/ExploreStaticData";

export const staticSearchData = [
  ...staticDestination.map((item) => ({
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