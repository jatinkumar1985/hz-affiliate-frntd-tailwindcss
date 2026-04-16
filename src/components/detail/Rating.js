import React, { useId } from 'react';

const Rating = ({ rating, size = 'md', showText = true }) => {
  const maxStars = 5;

  // ✅ Clamp rating between 0 and 5
  const numericRating = Math.min(
    maxStars,
    Math.max(0, parseFloat(rating) || 0)
  );

  const filledStars = Math.floor(numericRating);
  const hasHalfStar = numericRating % 1 >= 0.5;

  // ✅ Never allow negative array length
  const emptyStars = Math.max(
    0,
    maxStars - filledStars - (hasHalfStar ? 1 : 0)
  );

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className={`flex items-center gap-1 ${sizeClasses[size]}`}>
      {/* Filled Stars */}
      {Array.from({ length: filledStars }).map((_, i) => (
        <Star key={`filled-${i}`} filled />
      ))}

      {/* Half Star */}
      {hasHalfStar && <Star half />}

      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} />
      ))}

      {/* Rating Text */}
      {showText && numericRating > 0 && (
        <span className="ml-1 font-bold text-gray-500">
          {numericRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

// ⭐ Star SVG Component
const Star = ({ filled = false, half = false }) => {
  const gradientId = useId();

  return (
    <svg
      className={`w-4 h-4 ${
        filled || half ? 'text-orange-400' : 'text-gray-300'
      }`}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : half ? `url(#${gradientId})` : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      {half && (
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="50%" stopColor="#FB923C" />
            <stop offset="50%" stopColor="#E5E7EB" />
          </linearGradient>
        </defs>
      )}

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2l3.09 6.26L22 9.27l-5 4.87
           1.18 6.88L12 17.77l-6.18 3.25
           L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    </svg>
  );
};

export default Rating;
