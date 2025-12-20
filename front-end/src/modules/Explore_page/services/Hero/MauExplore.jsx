// import React, { useState } from "react";
// import ExploreNavbar from "./components/ExploreNavbar";
// import HeroSlider from "./components/HeroSlider";
// import TypingText from "./components/TypingText";

// import useAdvertisements from "./hooks/useAdvertisements";
// import useScrollHeader from "./hooks/useScrollHeader";
// import useTypingText from "./hooks/useTypingText";

// const MauExplore = () => {
//   const [mobile, setMobile] = useState(false);
//   const [account, setAccount] = useState(false);
//   const [search, setSearch] = useState(false);

//   const isScrolled = useScrollHeader();

//   const {
//     ads,
//     current,
//     direction,
//     variants,
//     loading,
//   } = useAdvertisements("mauranipur");

//   const text = "A true traveler collects memories, not destinations...";
//   const displayedText = useTypingText(text);

//   if (loading) return <div className="py-24 text-center">Loading...</div>;

//   return (
//     <div id="home" className="relative w-full py-4 overflow-hidden">
//       <ExploreNavbar
//         mobile={mobile}
//         setMobile={setMobile}
//         account={account}
//         setAccount={setAccount}
//         search={search}
//         setSearch={setSearch}
//         isScrolled={isScrolled}
//       />

//       <section className="relative flex flex-col items-center py-24">
//         <HeroSlider
//           ads={ads}
//           current={current}
//           direction={direction}
//           variants={variants}
//         />

//         <TypingText text={displayedText} />
//       </section>
//     </div>
//   );
// };

// export default MauExplore;
