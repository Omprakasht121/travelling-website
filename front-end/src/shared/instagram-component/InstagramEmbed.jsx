import React, { useEffect } from "react";

export default function InstagramEmbed({ permalink, maxWidth = 400 }) {
  useEffect(() => {
    // Initialize Instagram embed once the component mounts
    const loadInstagramEmbed = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    };

    // If script already loaded
    if (window.instgrm) {
      loadInstagramEmbed();
    } else {
      // Add the script dynamically (in case not loaded)
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = loadInstagramEmbed;
      document.body.appendChild(script);
    }
  }, [permalink]);

  return (
    <div
      className="flex justify-center my-4"
      style={{ maxWidth: `${maxWidth}px`, width: "100%" }}
    >
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
        style={{
          background: "#ffffffff",
          borderRadius: "20px",
          overflow: "hidden",
          width: "100%",
          margin: 0,
          border: "1px solid #e6e6e6",
        }}
      ></blockquote>
    </div>
  );
}
