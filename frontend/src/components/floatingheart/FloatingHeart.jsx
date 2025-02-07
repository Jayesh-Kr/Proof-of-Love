import { Heart } from 'lucide-react';
import "./floatingheart.css";
const FloatingHeart = () => {
  return (
    // <div className="floating-hearts-container">
      <div className="floating-hearts">
        {[...Array(20)].map((_, i) => {
          const size = Math.floor(Math.random() *25) + 4; // Random size between 4px and 16px
          return (
            <Heart
              key={i}
              className="heart"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 5}s`,
              }}
            />
          );
        })}
      </div>
    // </div>
  )
}

export default FloatingHeart