// --------------------------------------------------
// CREATOR PROFILE MODAL
// --------------------------------------------------
const CreatorProfileModal = ({ creator, onClose }) => {
  const cover = makeImageUrl(creator.coverPhoto) || fallbackCover;
  const profile = makeImageUrl(creator.profilePic) || makeImageUrl(creator.coverPhoto) || fallbackProfile;
  const gallery = Array.isArray(creator.bestPhotos) ? creator.bestPhotos.map(makeImageUrl).filter(Boolean) : [];

  const socialIcons = {
    instagram: <Instagram className="w-5 h-5" />,
    youtube: <Youtube className="w-5 h-5" />,
    facebook: <Facebook className="w-5 h-5" />,
  };

  return (
    <motion.div
        className="fixed inset-0 z-50 bg-gray-900 text-white flex flex-col "
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.45 }}
      >
        <div className="flex-1 container mx-auto overflow-y-auto px-4 sm:px-6 lg:px-24">

       <header className=" top-0 flex items-center justify-between p-4 bg-gray-950/80 backdrop-blur-md border-b border-gray-800 rounded-lg">
        <h2 className="text-xl font-bold">{creator.name}</h2>
        <button onClick={onClose} className="p-2 rounded-full bg-white/30 hover:scale-125 hover:bg-gray-600 transition-transform duration-300 easeInOut shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,0,0,0.05),_1px_3px_8px_rgba(0,100,100,0.6)]">
          <X className="w-6 h-6" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto ">
        <div className="relative h-64 md:h-96 border border-white/30 rounded-xl">
          <img src="https://images.unsplash.com/photo-1683721003111-070bcc053d8b?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover rounded-xl" alt={creator.name} />
          <div className="absolute inset-0 bg-black/40"></div>

          <img
            src={cover}
            className="absolute -bottom-12 left-6 w-24 h-24 rounded-full border border-white/20 object-cover shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]"
            alt={`${creator.name} profile`}
          />
        </div>
        {/* basic information  */}
        <div className="mt-16 px-8 md:flex-row justify-between items-center gap-6  ">
          <div>
            <h2 className="text-4xl font-extrabold">{creator.name}</h2>
            <p className="text-xl text-orange-400 font-semibold">{creator.category}</p>
          </div>
          {/* social media icons  */}
          <div className=" md:px-8 flex justify-between items-center">
            <div className="flex gap-3 mt-4 ">
              {Object.entries(creator.social || {}).map(([key, url]) =>
                url ? (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-700 rounded-full hover:bg-orange-600 transition"
                  >
                    {socialIcons[key]}
                  </a>
                ) : null
              )}
            </div>
            
            <a
            href={`mailto:${creator.contact?.email || ""}`}
            className="px-6 py-3 bg-orange-600 rounded-full font-semibold hover:bg-orange-700 hover:scale-110 transition-transform duration-300 easeInOut flex items-center gap-2 shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]"
          >
            Contact <ArrowRight className="w-5 h-5" />
          </a>
          
          </div>
        </div>
        {/* profile cards  */}
        <div className="md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 pb-32 ">
          {/* left container  */}
          <div className=" p-2 lg:px-12 rounded-2xl  border border-gray-700 flex flex-col justify-center items-center">
            <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4 border-2 border-sky-500/40 transition-transform duration-300 easeInOut  shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]">
              <img
                src={cover}
                alt={creator.name}
                className="w-full h-full object-cover"
              />
              {/* Placeholder for a logo/icon in the center of the profile pic if needed */}
              {/* <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
                B
              </div> */}
            </div>
            {/* Name and Category */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center">
              {creator.name}
            </h2>
            <p className="text-orange-400 text-lg font-medium text-center mb-6">
              {creator.bio}
            </p>

             {/* Stats */}
            <div className="flex justify-around w-full mb-8">
              
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">
                  {creator.stats.posts}
                </span>
                <p className="text-sm text-gray-400">Posts</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">
                  {creator.stats.followers}
                </span>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">
                  {creator.stats.following}
                </span>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </div>
            {/* Action Buttons */}
                  <div className="flex gap-6 w-full mb-8">
                    <motion.a
                     href={`${creator.social.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer" // or creator.social.instagram for 'Follow'
                      className="flex-1 text-center py-3 bg-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-transform duration-300 easeInOut  shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_8px_rgba(0,0,0,0.6)]"
                      whileHover={{ scale: 1.05}}
                      whileTap={{ scale: 0.95 }}
                    >
                      Follow
                    </motion.a>
                    <motion.a
                      href={`tel:${creator.contact.phone}`} // or other contact method
                      className="flex-1  py-3 bg-gray-700 text-gray-200 font-semibold rounded-xl text-lg text-center transition-transform duration-300 easeInOut  shadow-[inset_4px_4px_6px_rgba(0,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_8px_rgba(0,0,0,0.6)]"
                      whileHover={{ scale: 1.05, backgroundColor: "#4B5563" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Message
                    </motion.a>
                  </div>
            <h3 className="text-xl font-bold mb-3">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {gallery.length ? (
                gallery.map((src, i) => (
                  <img key={i} src={src} alt={`gallery-${i}`} className="w-full h-48 object-cover rounded-lg" />
                ))
              ) : (
                <p className="text-gray-300 p-4">No gallery images</p>
              )}
            </div>
          </div>


              {/* right side container  */}
          <div className=" flex flex-col gap-4 rounded-xl">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-2xl font-bold mb-6">Contact Details</h3>
            <ul className="space-y-4">
              {creator.contact?.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-400" /> +91<span>{creator.contact.phone}</span>
                </li>
              )}
              {creator.contact?.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-400" /> <span>{creator.contact.email}</span>
                </li>
              )}
              {creator.contact?.whatsapp && (
                <li className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-orange-400" /> +91<span>{creator.contact.whatsapp}</span>
                </li>
              )}
            </ul>
            </div>
          </div>
        </div>
      </div>
     </div>
    </motion.div>
  );
};
