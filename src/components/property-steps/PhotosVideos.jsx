// import { useState, useEffect } from 'react';
// import { Upload, X, Video, Mic } from 'lucide-react';
// import ApiService from '../../hooks/ApiService';

// const PhotosVideos = ({ data = {}, updateData, onNext, isEditMode = false }) => {
//   // --- State initialization ---
//   const [photos, setPhotos] = useState([]);
//   const [videos, setVideos] = useState(null); // single video
//   const [voiceOver, setVoiceOver] = useState(null);
//   const [youtubeUrl, setYoutubeUrl] = useState('');
//   const [dragActive, setDragActive] = useState(false);

//   // --- Load initial data in Edit mode ---
//   useEffect(() => {
//     if (isEditMode && data) {
//       if (data.photos?.length) {
//         setPhotos(
//           data.photos.map((p, idx) => ({
//             id: Date.now() + idx,
//             file: null, // no original File, only URL in edit mode
//             preview: p, // URL from backend
//           }))
//         );
//       }
//       if (data.video) {
//         setVideos({ file: null, preview: data.video, url: data.video });
//       }
//       if (data.audio) {
//         setVoiceOver({ file: null, preview: data.audio, name: data.audio.split('/').pop() });
//       }
//     }
//   }, [data, isEditMode]);

//   // --- DRAG & DROP HANDLERS ---
//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (['dragenter', 'dragover'].includes(e.type)) setDragActive(true);
//     else if (e.type === 'dragleave') setDragActive(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
//   };

//   const handleChange = (e) => {
//     if (e.target.files?.length) handleFiles(e.target.files);
//   };

//   // --- Handle image selection and watermarking ---
//   const handleFiles = async (files) => {
//     const newPhotos = [];

//     for (const file of files) {
//       const fileUrl = URL.createObjectURL(file);
//       const img = new Image();
//       img.src = fileUrl;

//       await new Promise((res) => (img.onload = res));

//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");
//       canvas.width = img.width;
//       canvas.height = img.height;

//       ctx.drawImage(img, 0, 0);

//       const fontSize = Math.floor(canvas.width * 0.08);
//       ctx.font = `${fontSize}px Arial`;
//       ctx.fillStyle = "rgba(255,255,255,0.5)";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.shadowColor = "rgba(0,0,0,0.6)";
//       ctx.shadowBlur = 8;

//       ctx.fillText("vizaglands.com", canvas.width / 2, canvas.height / 2);

//       const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
//       const blob = await (await fetch(dataUrl)).blob();
//       const watermarkedFile = new File([blob], file.name, { type: "image/jpeg" });

//       newPhotos.push({
//         id: Date.now() + Math.random(),
//         file: watermarkedFile,
//         preview: dataUrl,
//       });
//     }

//     setPhotos((prev) => [...prev, ...newPhotos]);
//   };

//   // --- Video upload ---
//   const handleVideoUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const previewUrl = URL.createObjectURL(file);
//     setVideos({ file, preview: previewUrl });
//   };

//   const handleRemoveVideo = () => setVideos(null);

//   // --- Voice-over upload ---
//   const handleVoiceOver = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setVoiceOver({ name: file.name, file, preview: URL.createObjectURL(file) });
//   };

//   const removeVoiceOver = () => setVoiceOver(null);

//   // --- Remove photo ---
//   const removePhoto = (id) => setPhotos(photos.filter((p) => p.id !== id));

//   // --- Upload helpers ---
//   const uploadImages = async (images) => {
//     const clientToken = localStorage.getItem("token");
//     try {
//       const formData = new FormData();
//       images.forEach((img) => img.file && formData.append("images", img.file));
//       const response = await ApiService.post("images/upload-multiple", formData, {
//         headers: { Authorization: `Bearer ${clientToken}`, "Content-Type": "multipart/form-data" },
//       });
//       return response.data?.images.map((i) => i.url) || [];
//     } catch (err) {
//       console.error("Image upload error:", err);
//       return [];
//     }
//   };

//   const uploadVideo = async (video) => {
//     if (!video?.file) return video?.preview || null;
//     const clientToken = localStorage.getItem("token");
//     try {
//       const formData = new FormData();
//       formData.append("video", video.file);
//       const response = await ApiService.post("images/uploadVideo", formData, {
//         headers: { Authorization: `Bearer ${clientToken}`, "Content-Type": "multipart/form-data" },
//       });
//       return response.url;
//     } catch (err) {
//       console.error("Video upload error:", err);
//       return null;
//     }
//   };

//   const uploadAudio = async (audio) => {
//     if (!audio?.file) return audio?.preview || null;
//     const clientToken = localStorage.getItem("token");
//     try {
//       const formData = new FormData();
//       formData.append("document", audio.file);
//       const response = await ApiService.post("images/upload-document", formData, {
//         headers: { Authorization: `Bearer ${clientToken}`, "Content-Type": "multipart/form-data" },
//       });
//       return response.url;
//     } catch (err) {
//       console.error("Audio upload error:", err);
//       return null;
//     }
//   };

//   // --- Continue button ---
//   const handleContinue = async () => {
//     try {
//       const uploadedPhotos = await uploadImages(photos);
//       const uploadedVideo = await uploadVideo(videos);
//       const uploadedAudio = await uploadAudio(voiceOver);

//       updateData({
//         photos: uploadedPhotos,
//         video: uploadedVideo,
//         audio: uploadedAudio,
//       });
//       onNext();
//     } catch (err) {
//       console.error("Upload failed:", err);
//     }
//   };

//   return (
//     <div className="space-y-10">
//       <div>
//         <h2 className="font-serif text-3xl font-bold text-blue-900 mb-2">
//           Photos, Videos & Voice-over
//         </h2>
//         <p className="font-roboto text-gray-600">Add media to make your property stand out.</p>
//       </div>

//       {/* Upload Photos */}
//       <div className="flex flex-wrap gap-6">
//         <div
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//           className={`border-2 border-dashed rounded-xl p-10 w-60 h-60 flex flex-col justify-center items-center text-center transition-colors ${
//             dragActive ? "border-orange-500 bg-orange-50" : "border-gray-300 bg-gray-50"
//           }`}
//         >
//           <input
//             type="file"
//             id="photo-upload"
//             multiple
//             accept="image/*"
//             onChange={handleChange}
//             className="hidden"
//           />
//           <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center space-y-3">
//             <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
//               <Upload className="w-7 h-7 text-orange-500" />
//             </div>
//             <div>
//               <p className="font-roboto text-sm text-gray-700">
//                 <span className="text-orange-500 font-medium">Click</span> or drag
//               </p>
//               <p className="text-xs text-gray-500">PNG, JPG, JPEG</p>
//             </div>
//           </label>
//         </div>

//         {/* Preview Photos */}
//         {photos.map((photo) => (
//           <div key={photo.id} className="relative group w-60 h-60 rounded-lg overflow-hidden bg-gray-100">
//             <img src={photo.preview} alt="Property" className="w-full h-full object-cover" />
//             <button
//               onClick={() => removePhoto(photo.id)}
//               className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Upload Video */}
//       <div>
//         <label htmlFor="video-upload" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg cursor-pointer hover:bg-blue-700 transition-all">
//           Upload Video
//         </label>
//         <input type="file" id="video-upload" accept="video/*" onChange={handleVideoUpload} className="hidden" />
//         {videos && (
//           <div className="relative border rounded-lg mb-3 mt-3 overflow-hidden w-full max-w-md">
//             <video src={videos.preview || videos.url} controls className="w-full h-64 object-cover" />
//             <button
//               onClick={handleRemoveVideo}
//               className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white px-2 py-1 text-sm rounded"
//             >
//               ✕
//             </button>
//           </div>
//         )}

//         <input
//           type="url"
//           placeholder="Enter YouTube or video link"
//           value={youtubeUrl}
//           onChange={(e) => setYoutubeUrl(e.target.value)}
//           className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none mt-2"
//         />
//       </div>

//       {/* Voice-over */}
//       <div>
//         {!voiceOver ? (
//           <label className="flex items-center gap-3 border-2 border-dashed border-gray-300 rounded-lg px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
//             <Upload className="w-5 h-5 text-orange-500" />
//             <span className="text-gray-700 font-medium">Click to upload voice-over (MP3/WAV)</span>
//             <input type="file" accept="audio/*" className="hidden" onChange={handleVoiceOver} />
//           </label>
//         ) : (
//           <div className="flex items-center justify-between bg-blue-50 px-4 py-3 rounded-lg">
//             <div className="flex items-center gap-3">
//               <audio controls src={voiceOver.preview} className="w-64" />
//               <span className="text-gray-700">{voiceOver.name}</span>
//             </div>
//             <button onClick={removeVoiceOver} className="text-red-500 hover:text-red-700">
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         )}
//       </div>

//       <button
//         onClick={handleContinue}
//         className="bg-blue-900 hover:bg-blue-800 text-white font-roboto font-medium px-10 py-3 rounded-lg transition-colors"
//       >
//         Continue
//       </button>
//     </div>
//   );
// };

// export default PhotosVideos;

import { useState, useEffect } from "react";
import { Upload, X, Video, Mic } from "lucide-react";
import ApiService from "../../hooks/ApiService";

const PhotosVideos = ({ data = {}, updateData, onNext, setPropertyData }) => {
  console.log("rrr",data)
    const [dragActive, setDragActive] = useState(false);

  const existingPhotos=data.photos;
  const existingVideo=data.video;
  const existingVoiceOver=data.audio;
  const [formData, setFormData] = useState({
    photos: [],
    video: null,
    voiceOver: null,
  });
  // --- DRAG & DROP HANDLERS ---
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (['dragenter', 'dragover'].includes(e.type)) setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  };


  // --- Load existing media ---
  useEffect(() => {
    // --- Photos ---
    let normalizedPhotos = [];
    if (Array.isArray(existingPhotos)) normalizedPhotos = existingPhotos;
    else if (typeof existingPhotos === "string" && existingPhotos.startsWith("[")) {
      try { normalizedPhotos = JSON.parse(existingPhotos); } 
      catch { normalizedPhotos = []; }
    } else if (typeof existingPhotos === "string" && existingPhotos.length > 0) {
      normalizedPhotos = [existingPhotos];
    }

    const photoObjects = normalizedPhotos.map((url) => ({ url, isNew: false }));

    // --- Video ---
    const videoObj = existingVideo ? { url: existingVideo, isNew: false } : null;

    // --- Voice-over ---
    const voiceObj = existingVoiceOver ? { url: existingVoiceOver, isNew: false } : null;

    setFormData({
      photos: photoObjects,
      video: videoObj,
      voiceOver: voiceObj,
    });
  }, [existingPhotos, existingVideo, existingVoiceOver]);

  // --- Handle new file uploads ---
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isNew: true,
    }));
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos],
    }));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newVideo = {
      file,
      preview: URL.createObjectURL(file),
      isNew: true,
    };
    setFormData((prev) => ({ ...prev, video: newVideo }));
  };

  const handleVoiceOverUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newVoice = {
      file,
      preview: URL.createObjectURL(file),
      isNew: true,
    };
    setFormData((prev) => ({ ...prev, voiceOver: newVoice }));
  };

  // --- Remove media ---
  const removePhoto = (index) => {
    setFormData((prev) => {
      const updated = [...prev.photos];
      const removed = updated[index];
      if (removed.isNew && removed.preview) URL.revokeObjectURL(removed.preview);
      updated.splice(index, 1);
      return { ...prev, photos: updated };
    });
  };

  const removeVideo = () => setFormData((prev) => ({ ...prev, video: null }));
  const removeVoiceOver = () => setFormData((prev) => ({ ...prev, voiceOver: null }));

  // --- Submit handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminToken = localStorage.getItem("token");

    try {
      // --- Photos ---
      const existingPhotoUrls = formData.photos.filter(p => !p.isNew).map(p => p.url);
      const newPhotoFiles = formData.photos.filter(p => p.isNew && p.file).map(p => p.file);
      let uploadedPhotoUrls = [];

      if (newPhotoFiles.length > 0) {
        const form = new FormData();
        newPhotoFiles.forEach(file => form.append("images", file));
        const res = await ApiService.post("/images/upload-multiple", form, {
          headers: { Authorization: `Bearer ${adminToken}`, "Content-Type": "multipart/form-data" },
        });
        uploadedPhotoUrls = res.images.map(img => img.url);
      }

      // --- Video ---
      let uploadedVideoUrl = formData.video && formData.video.isNew ? null : formData.video?.url;
      if (formData.video && formData.video.isNew) {
        const form = new FormData();
        form.append("video", formData.video.file);
        const res = await ApiService.post("/images/uploadVideo", form, {
          headers: { Authorization: `Bearer ${adminToken}`, "Content-Type": "multipart/form-data" },
        });
        uploadedVideoUrl = res.url;
      }

      // --- Voice-over ---
      let uploadedVoiceUrl = formData.voiceOver && formData.voiceOver.isNew ? null : formData.voiceOver?.url;
      if (formData.voiceOver && formData.voiceOver.isNew) {
        const form = new FormData();
        form.append("document", formData.voiceOver.file);
        const res = await ApiService.post("/images/upload-document", form, {
          headers: { Authorization: `Bearer ${adminToken}`, "Content-Type": "multipart/form-data" },
        });
        uploadedVoiceUrl = res.url;
      }

      // --- Merge all URLs ---
      const finalPhotoUrls = [...existingPhotoUrls, ...uploadedPhotoUrls];

      const finalData = {
        photos: finalPhotoUrls,
        video: uploadedVideoUrl,
        audio: uploadedVoiceUrl,
      };

      console.log("✅ Final Media Data:", finalData);

      // Update parent or backend
      // setPropertyData(finalData);
      updateData(finalData)
      onNext()

    } catch (err) {
      console.error("❌ Upload failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* --- Photos --- */}
      <div>
      <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-10 w-60 h-60 flex flex-col justify-center items-center text-center transition-colors ${
            dragActive ? "border-orange-500 bg-orange-50" : "border-gray-300 bg-gray-50"
          }`}
        >
          <input
            type="file"
            id="photo-upload"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center space-y-3">
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
        <div className="flex flex-wrap gap-4 mt-3">
          {formData.photos.map((photo, idx) => (
            <div key={idx} className="relative w-40 h-40 rounded-lg overflow-hidden bg-gray-100">
              <img src={photo.preview || photo.url} alt="photo" className="w-full h-full object-cover" />
              <button type="button" onClick={() => removePhoto(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- Video --- */}
      <div>
        <label className="cursor-pointer flex items-center gap-3 border-2 border-dashed rounded-lg px-5 py-4 bg-gray-50 hover:bg-gray-100">
          <Upload className="w-5 h-5 text-blue-500" />
          <span className="text-gray-700 font-medium">Upload Video</span>
          <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
        </label>
        {formData.video && (
          <div className="relative mt-3">
            <video src={formData.video.preview || formData.video.url} controls className="w-full max-w-md h-60 object-cover" />
            <button type="button" onClick={removeVideo} className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 rounded">✕</button>
          </div>
        )}
      </div>

      {/* --- Voice-over --- */}
      <div>
        <label className="cursor-pointer flex items-center gap-3 border-2 border-dashed rounded-lg px-5 py-4 bg-gray-50 hover:bg-gray-100">
          <Upload className="w-5 h-5 text-green-500" />
          <span className="text-gray-700 font-medium">Upload Voice-over</span>
          <input type="file" accept="audio/*" className="hidden" onChange={handleVoiceOverUpload} />
        </label>
        {formData.voiceOver && (
          <div className="flex items-center justify-between mt-3 bg-blue-50 px-4 py-3 rounded-lg max-w-md">
            <audio controls src={formData.voiceOver.preview || formData.voiceOver.url} className="w-64" />
            <button type="button" onClick={removeVoiceOver} className="text-red-500 hover:text-red-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <button type="submit" className="bg-blue-900 text-white px-6 py-3 rounded-lg">Save</button>
    </form>
  );
};

export default PhotosVideos;

