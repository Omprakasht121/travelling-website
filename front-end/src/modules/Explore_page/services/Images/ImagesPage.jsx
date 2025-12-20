import React, { useEffect, useState } from "react";
import ImagesGalleryModal from "./ImagesGalleryModal";
import ImageGrid from "./ImageGrid";
import useImagesData from "./useImagesData";


const ImagesPage = () => {
  const {
    loading,
    mainImage,
    smallImages,
    allImages,
    setSmallImages,
  } = useImagesData("mauranipur");

  const [showAll, setShowAll] = useState(false);

  // RANDOM IMAGE ROTATION (unchanged logic)

  useEffect(() => {
  if (!smallImages.length) return;

  const intervalIds = [];

  const pickRandomImage = (current) => {
    const pool = allImages.filter((img) => img !== current);
    return pool[Math.floor(Math.random() * pool.length)];
  };
  
  smallImages.forEach((_, index) => {
    const randomTime = Math.floor(Math.random() * 4000) ; 
    const id = setInterval(() => {
      setSmallImages((prev) => {
        const newArr = [...prev];
        newArr[index] = pickRandomImage(prev[index++]);
        return newArr;
      });
    }, randomTime);
    intervalIds.push(id);
  });

  return () => intervalIds.forEach(clearInterval);
}, [allImages.length]);

  if (loading)
    return <div className="text-center py-24 text-xl">Loading...</div>;

  return (
    <main id="images" className="relative max-h-screen w-full py-4 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">

        <header className="md:px-16 mb-4">
          <h1 className="text-3xl md:text-5xl font-extrabold">Images</h1>
          <p className="mt-2 text-sm md:text-base text-slate-800">
            Reach out and let’s bring you closer to the heart of Bundelkhand..
          </p>
        </header>

        <section className="relative lg:px-24 py-8">
          <ImageGrid mainImage={mainImage} smallImages={smallImages} />

          <div className="text-right mt-2 md:mt-4 pr-4">
            <button
              onClick={() => setShowAll(true)}
              className="underline text-sm md:text-base"
            >
              Show all photos
            </button>
          </div>
        </section>
      </div>

      {showAll && (
        <ImagesGalleryModal
          images={allImages}
          onClose={() => setShowAll(false)}
        />
      )}
    </main>
  );
};

export default ImagesPage;
