import React, { useState } from 'react';
import axios from 'axios';

const VotingPopup = ({ isOpen, onClose, movieId, socket, onVoteSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');

      // Submit vote via HTTP POST
      const response = await axios.post('https://movie-voting-u7oh.onrender.com/api/submit-vote', {
        movieId,
        rating,
        comment
      });

      if (response.data.success) {
        // Optionally emit socket event for real-time updates
        socket.emit('vote_update', {
          movieId,
          rating,
          comment
        });

        // Call parent component's vote submit handler
        onVoteSubmit({
          rating,
          comment
        });

        // Reset and close
        setRating(5);
        setComment('');
        onClose();
      } else {
        setSubmitStatus(response.data.message);
      }
    } catch (error) {
      setSubmitStatus(error.response?.data?.message || 'Failed to submit vote');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] font-[Mypoppins] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#153F29]">Rate & Review</h2>
          <button 
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {submitStatus && (
          <div className="mb-4 text-red-500">{submitStatus}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating (1-10)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-[#81E687] text-[#153F29] py-3 rounded-md font-bold tracking-wider hover:bg-[#6bc770] transition-colors"
          >
            SUBMIT VOTE
          </button>
        </form>
      </div>
    </div>
  );
};

export default VotingPopup; 