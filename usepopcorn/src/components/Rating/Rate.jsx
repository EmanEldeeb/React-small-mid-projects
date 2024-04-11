import { useState } from "react";
import Star from "./Star";

const ratingList = {
  display: "flex",
  gap: "5px",
  fontSize: "12px",
  lineHeight: "1",
};

function Rate({ color = "yellow", size = "15px", maxRating = 5, getRating }) {
  const [rating, setrating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(index) {
    setrating(index + 1);
    getRating(index + 1);
  }
  function handleEnterStar(index) {
    setTempRating(index + 1);
  }
  function handleOffStar() {
    setTempRating(0);
  }

  return (
    <div>
      <div style={ratingList}>
        <ul style={ratingList}>
          {Array.from({ length: maxRating }, (_, i) => (
            <Star
              color={color}
              size={size}
              key={i}
              handleRating={handleRating}
              index={i}
              full={tempRating ? tempRating - 1 >= i : rating - 1 >= i}
              handleEnterStar={handleEnterStar}
              handleOffStar={handleOffStar}
            ></Star>
          ))}
        </ul>
        <span style={{ fontSize: "14px", lineHeight: "1" }}>
          {tempRating || rating || ""}
        </span>
      </div>
    </div>
  );
}

export default Rate;
