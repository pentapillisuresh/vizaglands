import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const PhotosVideos = ({ data, updateData, onNext }) => {
  const [photos, setPhotos] = useState(data.photos || []);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newPhotos = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setPhotos([...photos, ...newPhotos]);
  };

  const removePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  const handleContinue = () => {
    updateData({ photos });
    onNext();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-bold text-blue-900 mb-2">
          Photos, Videos & Voice-over
        </h2>
        <p className="font-roboto text-gray-600">
          Add photos to make your property stand out
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
          dragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-gray-50'
        }`}
      >
        <input
          type="file"
          id="photo-upload"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        <label htmlFor="photo-upload" className="cursor-pointer">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <p className="font-roboto text-lg text-gray-700 mb-1">
                <span className="text-orange-500 font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="font-roboto text-sm text-gray-500">
                PNG, JPG or JPEG (max. 5MB each)
              </p>
            </div>
          </div>
        </label>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div>
          <h3 className="font-roboto text-lg font-medium text-gray-700 mb-4">
            Uploaded Photos ({photos.length})
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={photo.preview}
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removePhoto(photo.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {photos.length === 0 && (
        <div className="flex items-center justify-center py-8 bg-blue-50 rounded-lg">
          <div className="text-center">
            <ImageIcon className="w-12 h-12 text-blue-300 mx-auto mb-3" />
            <p className="font-roboto text-gray-600">No photos uploaded yet</p>
          </div>
        </div>
      )}

      <button
        onClick={handleContinue}
        className="bg-blue-700 hover:bg-blue-800 text-white font-roboto font-medium px-10 py-3 rounded-lg transition-colors"
      >
        Continue
      </button>
    </div>
  );
};

export default PhotosVideos;
