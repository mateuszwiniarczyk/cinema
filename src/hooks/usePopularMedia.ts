import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

type movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type tvShow = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

type returnedData = {
  isLoading: boolean;
  isError: string;
  popularMedia: (movie | tvShow)[] | [];
};

const usePopularMedia = (type: string): returnedData => {
  const [popularMedia, setPopularMedia] = useState<(movie | tvShow)[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const isMounted = useRef(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const {
          data: { results }
        } = await axios.get(
          `https://api.themoviedb.org/3/${type}/popular?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );

        const list = results?.filter((media: tvShow | movie) => media.backdrop_path);

        if (isMounted.current) {
          setPopularMedia(list);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(error.message);
      }
    })();
  }, [type]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { isLoading, isError, popularMedia };
};

export default usePopularMedia;
