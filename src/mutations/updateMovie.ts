import gql from 'graphql-tag'

export const UPDATE_MOVIE_MUTATION = gql`
  mutation UpdateMovie($id: String!, $input: UpdateMovieInput!) {
    updateMovie(id: $id, input: $input) {
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
