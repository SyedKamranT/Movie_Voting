import React from 'react';

const VideoPopup = ({ videoUrl, isOpen, onClose }) => {
  // Enhanced YouTube ID extraction to handle additional parameters
  const getYouTubeId = (url) => {
    if (!url) return null;
    // Handle various YouTube URL formats including additional parameters
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 font-[Mypoppins] text-[14px] font-[700] tracking-[2px] px-4 py-2"
        >
          CLOSE
        </button>
        <div className="relative pt-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${getYouTubeId(videoUrl)}`}
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;