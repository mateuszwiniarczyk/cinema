import { Wrapper, Image, Name, Genre } from './index.styles';
import { MediaTypes } from 'types/media';
import { MovieGenres, TvShowGenres } from 'types/genres';

type LimitedMediaProps = {
  readonly mediaType: MediaTypes.Tv | MediaTypes.Movie;
  readonly id: number;
  readonly name: string;
  readonly image: string;
  readonly genreId: number | undefined;
};

type AllMediaProps = {
  readonly id: number;
  readonly mediaType: MediaTypes.All;
  readonly link: string;
  readonly image: string;
  readonly name: string;
};

type Props = LimitedMediaProps | AllMediaProps;

const MediaBox = (props: Props): JSX.Element => {
  let type;
  let genreName;
  const { id, image, mediaType, name } = props;

  if (props.mediaType !== MediaTypes.All) {
    const { genreId } = props;
    const genres = mediaType === MediaTypes.Movie ? MovieGenres : TvShowGenres;
    genreName = genreId ? genres[genreId] : 'No data';
    type = mediaType;
  } else {
    const { link } = props;
    type = link;
  }

  return (
    <Wrapper to={`/${type}/${id}`}>
      <Image
        src={`https://image.tmdb.org/t/p/w300/${image}`}
        alt={name}
        mediaType={mediaType}
        loading="lazy"
      />
      {props.mediaType !== MediaTypes.All ? (
        <>
          <Name>{name}</Name>
          <Genre>{genreName}</Genre>
        </>
      ) : null}
    </Wrapper>
  );
};

export default MediaBox;
