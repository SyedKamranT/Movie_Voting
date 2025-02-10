import React, { useState } from 'react';

const VotingPopup = ({ isOpen, onClose, movieId, socket, onVoteSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Emit vote data to socket
    socket.emit('submit-vote', {
      movieId,
      rating,
      comment
    });

    // Call the onVoteSubmit callback
    onVoteSubmit({
      rating,
      comment
    });

    // Reset form and close popup
    setRating(5);
    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#153F29]">Rate & Review</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

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
            className="w-full bg-[#81E687] text-[#153F29] py-3 rounded-md font-bold tracking-wider hover:bg-[#6bc770] transition-colors"
          >
            SUBMIT VOTE
          </button>
        </form>
      </div>
    </div>
  );
};

export default VotingPopup;