
import Hero from "./Hero";
import Oneview from "./Oneview";
import Explore from "./Explore";
import RegionMap from "./RegionMap";
import About from "./About";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "../../../shared/component/ScrollToTop";
import AIPromptModal from "../../ai_planner/components/AIPromptModal";

function Landing(){
    return(
      <>
     <div >
        <Hero/>
        <div className="bg-gradient-to-br from-amber-800/20 to-blue-800/20">
        <Oneview/>
        <Explore/>
        <RegionMap/>
        <About/>
        <ContactUs/>
        <Footer/>
        </div>
     </div>
     <AIPromptModal />
     <ScrollToTop />
     <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: { fontSize: "16px" },
        }}
      />
      </>
    )
}

export default Landing;