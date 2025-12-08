import gql from 'graphql-tag'

export const LIST_MOVIES_QUERY = gql`
  query ListMovies {
    movies {
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
