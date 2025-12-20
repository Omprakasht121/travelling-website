import { motion } from "framer-motion";
import getImagePath from "../../../shared/utils/getImagePath";


const ImageGrid = ({ mainImage, smallImages }) => {
  return (
    <div className="h-[61vh] grid grid-cols-3 md:grid-cols-4 p-4 gap-4">
      {/* MAIN IMAGE */}
      <div className="h-full w-full col-span-3 md:col-span-2 rounded-xl overflow-hidden">
        <img
          src={getImagePath(mainImage)}
          className="object-cover h-full w-full rounded-xl border-2 border-black/20"
        />
      </div>

      {/* SMALL IMAGES */}
      <div className="col-span-3 md:col-span-2 flex gap-4 justify-center">
        {[0, 1].map((col) => (
          <div key={col} className="flex flex-col gap-4 w-1/2">
            {smallImages.slice(col * 2, col * 2 + 2).map((img, i) => (
              <motion.img
                key={col * 2 + i}
                src={getImagePath(img)}
                className="object-cover rounded-xl h-[14vh] md:h-[28vh] w-full border border-black/10"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
