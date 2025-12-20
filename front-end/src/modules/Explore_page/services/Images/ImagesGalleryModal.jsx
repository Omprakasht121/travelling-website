import getImagePath from "../../../shared/utils/getImagePath";

const ImagesGalleryModal = ({ images, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex flex-wrap justify-center items-center gap-4 p-6 z-50 overflow-auto">
      {images.map((img, i) => (
        <img
          key={i}
          src={getImagePath(img)}
          className="object-cover w-96 h-72 rounded-xl hover:scale-105 hover:border-2 hover:border-sky-700 transition duration-300"
        />
      ))}

      <button
        onClick={onClose}
        className="fixed top-4 right-4 bg-gray-700/80 hover:bg-white/40 text-white rounded-full px-4 py-2 shadow-lg"
      >
        Close
      </button>
    </div>
  );
};

export default ImagesGalleryModal;
