import Alert from 'components/Alert';
import Loader from 'components/Loader';
import MediaBox from 'components/MediaBox';
import Slider from 'components/Slider';
import usePopularMedia from 'hooks/usePopularMedia';
import { SwiperSlide } from 'swiper/react';
import { FilteredPopularMovie } from 'types/media';

const PopularMovieList = (): JSX.Element => {
  const { isError, isLoading, popularMedia } = usePopularMedia('movie') as {
    isError: string;
    isLoading: boolean;
    popularMedia: FilteredPopularMovie[] | [];
  };

  if (isLoading) return <Loader />;

  if (isError) return <Alert type="error" text={isError} />;

  return (
    <>
      {popularMedia.length ? (
        <Slider arrowBtnId="movie">
          {popularMedia.map(({ id, title, backdrop_path, genre_ids }) => (
            <SwiperSlide key={id}>
              <MediaBox
                id={id}
                name={title}
                image={backdrop_path}
                genreId={genre_ids[0]}
                mediaType={'movie'}
              />
            </SwiperSlide>
          ))}
        </Slider>
      ) : (
        <Alert type="info" text="Popular movies weren't found." />
      )}
    </>
  );
};

export default PopularMovieList;
