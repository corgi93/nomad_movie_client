/*
graphql-tag: 프론트엔드에서 graphql을 작성하는 방법
*/
import gql from "graphql-tag";

export const HOME_PAGE = gql`
  {
    movies(limit: 50, rating: 7) {
      id
      title
      rating
      medium_cover_image
    }
  }
`;

export const MOVIE_DETAILS = gql`
  query getMovieDetails($movieId: Int!) {
    movie(id: $movieId) {
      medium_cover_image
      title
      rating
      description_intro
      language
      genres
    }
    suggestions(id: $movieId) {
      id
      title
      rating
      medium_cover_image
    }
  }
`;

export const ADD_TODO = gql`
    mutation AddTodo($type: String!){
        addTodo(type: $type){
            id
            type
        }
    }
`;