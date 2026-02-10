import React from 'react';
import { FiStar, FiThumbsUp } from 'react-icons/fi';
import type { Review } from '../types/types';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            {review.userName.charAt(0).toUpperCase()}
          </div>

          {/* Nom et date */}
          <div>
            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
            <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
          </div>
        </div>

        {/* Note */}
        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
          {[...Array(5)].map((_, index) => (
            <FiStar
              key={index}
              className={`text-sm ${
                index < review.rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-1 text-sm font-semibold text-gray-700">
            {review.rating}.0
          </span>
        </div>
      </div>

      {/* Commentaire */}
      <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

      {/* Footer */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
          <FiThumbsUp className="text-lg" />
          <span>Utile (12)</span>
        </button>
        
        <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
          Signaler
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;