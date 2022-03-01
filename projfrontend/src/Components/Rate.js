import React, { useState , useEffect} from "react";
import { FaStar } from "react-icons/fa";

const Rate = ({rating, setUserRating }) => {
  const [rate, setRate] = useState(0);

  return (
    <div className="ratingcontainer">
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              
              className="ratingradio"
              value={givenRating}
              onClick={() => {
                setRate(givenRating);
                setUserRating(givenRating)
              }}
            />
            <div className="ratingDiv">
              <FaStar
                color={
                  givenRating < rate || givenRating === rate
                    ? "000"
                    : "rgb(192,192,192)"
                }
              />
            </div>
          </label>
        );
      })}
    </div>
  );
};
  
export default Rate;