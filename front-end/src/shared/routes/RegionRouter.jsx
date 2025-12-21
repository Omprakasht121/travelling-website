import { useParams } from "react-router-dom";

import ExploringJhansi from "../../modules/Explore_page/Jhansi-Explore/ExploringJhansi";
import ExploringOrchha from "../../modules/Explore_page/Orchha-Explore/ExploringOrchha";
import ExploringMau from "../../modules/Explore_page/Mauranipur-Explore/ExploringMau";


export default function RegionRouter() {
  const { region } = useParams();

  if (region === "mauranipur") return <ExploringMau />;
  if (region === "jhansi") return <ExploringJhansi />;
  if (region === "orchha") return <ExploringOrchha />;

  return <h1>404 - Region Not Found</h1>;
}
