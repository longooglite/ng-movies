import gql from 'graphql-tag'

export const CREATE_MOVIE_MUTATION = gql`
  mutation CreateMovie($input: CreateMovieInput!) {
    createMovie(input: $input) {
      id
      title
      year
      director
      decade
      country
      genre
      watched
      format
      label
      tmdbId
      tmdbPosterPath
      description
    }
  }
`
