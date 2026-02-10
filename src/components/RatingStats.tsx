import React from 'react';
import { FiStar } from 'react-icons/fi';

interface RatingStatsProps {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

const RatingStats: React.FC<RatingStatsProps> = ({
  averageRating,
  totalReviews,
  ratingDistribution
}) => {
  const getRatingPercentage = (count: number): number => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Note globale */}
        <div className="text-center">
          <div className="text-6xl font-bold text-gray-900 mb-2">
            {averageRating.toFixed(1)}
          </div>
          
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, index) => (
              <FiStar
                key={index}
                className={`text-2xl ${
                  index < Math.floor(averageRating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          <p className="text-gray-600">
            Basé sur <span className="font-semibold">{totalReviews}</span> avis
          </p>
        </div>

        {/* Distribution des notes */}
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingDistribution[rating as keyof typeof ratingDistribution];
            const percentage = getRatingPercentage(count);

            return (
              <div key={rating} className="flex items-center gap-3">
                {/* Étoiles */}
                <div className="flex items-center gap-1 w-24">
                  <span className="text-sm font-medium text-gray-700">{rating}</span>
                  <FiStar className="text-yellow-400 fill-current text-sm" />
                </div>

                {/* Barre de progression */}
                <div className="flex-1 h-3 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Pourcentage */}
                <span className="text-sm font-medium text-gray-700 w-12 text-right">
                  {percentage.toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RatingStats;