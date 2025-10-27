import { useState } from 'react';
import { Upload, X, Video, Mic } from 'lucide-react';
import watermark from 'watermarkjs'; // ✅ Add this import
import ApiService from '../../hooks/ApiService';

const PhotosVideos = ({ data, updateData, onNext }) => {
  const [photos, setPhotos] = useState(data.photos || []);
  const [videos, setVideos] = useState(data.videos || []);
  const [voiceOver, setVoiceOver] = useState(data.voiceOver || null);
  const [videoUrl, setVideoUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // --- DRAG & DROP HANDLERS ---
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
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
    if (e.target.files && e.target.files[0]) handleFiles(e.target.files);
  };

  // ✅ UPDATED: APPLY WATERMARK ON EACH IMAGE
  // ✅ UPDATED: Apply watermark on each image properly
// Handle file selection and watermarking
const handleFiles = async (files) => {
  const newPhotos = [];

  for (const file of files) {
    const fileUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = fileUrl;

    await new Promise((res) => (img.onload = res));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw original image
    ctx.drawImage(img, 0, 0);

    // ✅ Add centered watermark text
    const fontSize = Math.floor(canvas.width * 0.08); // 8% of image width
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; // white semi-transparent
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 8;

    const text = "vizaglands.com";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // ✅ Convert canvas to data URL
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);

    // ✅ Convert data URL to Blob for uploading
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    // ✅ Create a new File object (to mimic original file)
    const watermarkedFile = new File([blob], file.name, { type: "image/jpeg" });

    newPhotos.push({
      id: Date.now() + Math.random(),
      file: watermarkedFile,
      preview: dataUrl, // for UI display
    });
  }

  setPhotos((prev) => [...prev, ...newPhotos]);
};

// Handle upload and continue
const handleContinue = async () => {
  try {
    const uploaded = await uploadImages(photos);
    updateData({ photos: uploaded, youtubeUrl });
    onNext();
  } catch (err) {
    console.error("Upload failed:", err);
  }
};

// Upload images to backend
const uploadImages = async (imageObjects) => {
  const clientToken = localStorage.getItem("token");

  try {
    const formData = new FormData();

    // ✅ Append all files to FormData
    imageObjects.forEach((image) => {
      formData.append("images", image.file); // must be File/Blob
    });

    // ✅ API call
    const response = await ApiService.post("images/upload-multiple", formData, {
      headers: {
        Authorization: `Bearer ${clientToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const data = response.data?.images || response.images;
    const urls = data.map((item) => item.url);

    console.log("✅ URLs only:", urls);

    return urls;
  } catch (err) {
    console.error("❌ Error uploading images:", err);
    throw err;
  }
};



  const removePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  // --- VIDEO ---
  // const addVideoUrl = () => {
  //   if (videoUrl.trim() === '') return;
  //   setVideos([...videos, { id: Date.now(), url: videoUrl.trim() }]);
  //   setVideoUrl('');
  // };

  // const removeVideo = (id) => {
  //   setVideos(videos.filter((v) => v.id !== id));
  // };

  // --- VOICE OVER ---
  const handleVoiceOver = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVoiceOver({
        name: file.name,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const removeVoiceOver = () => {
    setVoiceOver(null);
  };

      
  

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-serif text-3xl font-bold text-blue-900 mb-2">
          Photos, Videos & Voice-over
        </h2>
        <p className="font-roboto text-gray-600">
          Add media to make your property stand out.
        </p>
      </div>

      {/* Upload + Preview */}
      <div className="flex flex-wrap gap-6">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-10 w-60 h-60 flex flex-col justify-center items-center text-center transition-colors ${
            dragActive
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-300 bg-gray-50'
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
          <label
            htmlFor="photo-upload"
            className="cursor-pointer flex flex-col items-center space-y-3"
          >
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
              <Upload className="w-7 h-7 text-orange-500" />
            </div>
            <div>
              <p className="font-roboto text-sm text-gray-700">
                <span className="text-orange-500 font-medium">Click</span> or drag
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG</p>
            </div>
          </label>
        </div>

        {/* Preview Photos */}
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative group w-60 h-60 rounded-lg overflow-hidden bg-gray-100"
          >
            <img
              src={photo.preview}
              alt="Property"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => removePhoto(photo.id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* --- Video URLs --- */}
      <div>
        <h3 className="font-roboto text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-blue-600" /> Add Video URLs
        </h3>
        <div className="flex gap-3">
          <input
            type="url"
            placeholder="Enter YouTube or video link"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {/* <button
            onClick={addVideoUrl}
            className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-lg"
          >
            Add
          </button> */}
        </div>

        {/* {videos.length > 0 && (
          <ul className="mt-4 space-y-2">
            {videos.map((v) => (
              <li
                key={v.id}
                className="flex items-center justify-between bg-blue-50 px-4 py-2 rounded-lg"
              >
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline truncate"
                >
                  {v.url}
                </a>
                <button
                  onClick={() => removeVideo(v.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )} */}
      </div>

      {/* --- Voice-over Upload --- */}
      <div>
        <h3 className="font-roboto text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
          <Mic className="w-5 h-5 text-blue-600" /> Add Voice-over
        </h3>

        {!voiceOver ? (
          <label className="flex items-center gap-3 border-2 border-dashed border-gray-300 rounded-lg px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
            <Upload className="w-5 h-5 text-orange-500" />
            <span className="text-gray-700 font-medium">
              Click to upload voice-over (MP3/WAV)
            </span>
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleVoiceOver}
            />
          </label>
        ) : (
          <div className="flex items-center justify-between bg-blue-50 px-4 py-3 rounded-lg">
            <div className="flex items-center gap-3">
              <audio controls src={voiceOver.preview} className="w-64" />
              <span className="text-gray-700">{voiceOver.name}</span>
            </div>
            <button
              onClick={removeVoiceOver}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleContinue}
        className="bg-blue-900 hover:bg-blue-800 text-white font-roboto font-medium px-10 py-3 rounded-lg transition-colors"
      >
        Continue
      </button>
    </div>
  );
};

export default PhotosVideos;
