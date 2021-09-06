import { useEffect, useState, useMemo } from 'react';
import './RatePlaylist.css';
import axios from 'axios';

//import StarRating from 'react-star-rating'

const AverageRating = (props) => {
  const playlistId = props.playlist.substring(17);

  const [average, setAverage] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:3001/rate/${playlistId}`).then((response) => {
      let average = 0;
      let total = 0;
      for (let i = 0; i < response.data.length; i++) {
        let a = parseInt(response.data[i].rating);
        total = total + a;
      }
      average = total / response.data.length;
      console.log(average);
      setAverage(average);
    });
  });

  function RatingIcon(props) {
    const { index, rating } = props;
    const fill = useMemo(() => {
      if (rating >= index) {
        return 'yellow';
      }

      return 'none';
    }, [rating, index]);
    return (
      <div>
        <StarIcon fill={fill} />
      </div>
    );
  }

  function StarIcon(props) {
    const { fill = 'none' } = props;
    return (
      <svg
        className="w-6 h-6"
        fill={fill}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        ></path>
      </svg>
    );
  }

  return (
    <div className="box flex">
      {[1, 2, 3, 4, 5].map((index) => {
        return <RatingIcon index={index} rating={average} />;
      })}
    </div>
  );
};

export default AverageRating;
