import React from "react";
import { useQuery } from "react-apollo";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { MOVIE_DETAILS } from "./queries";
import Helmet from "react-helmet";
import Movie from './Movie';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin-bottom: 50px;
`;

const Card = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  border-radius: 7px;
`;

const Image = Card.withComponent("img");

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Paragraph = styled.span`
  margin-bottom: 10px;
  display: block;
  font-weight: ${props => (props.bold ? "500" : "400")};
`;

const MovieContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 0.7fr);
  flex-wrap: wrap;
  justify-items: center;
  margin-top: 50px;
`;

const Detail = ({
  match: {
    params: { movieId }
  }
}) => {
  console.log(movieId);
  const { loading, error, data } = useQuery(MOVIE_DETAILS, {
    variables: { movieId }
  });
  if (loading)
    return (
      <>
        <Helmet>
          <title> loading | MovieQL </title>
        </Helmet>
        <h2>loading...</h2>
      </>
    );

  if (error) return <h2>error</h2>;

  return (
    <>
      <Container>
        <Helmet>
          <title>{data.movie.title} | MovieQL</title>
        </Helmet>
        <Image src={data.movie.medium_cover_image} />
        <span>
          <Title>{data.movie.title}</Title>
          <Paragraph bold>Rating: {data.movie.rating}</Paragraph>
          <Paragraph>{data.movie.description_intro}</Paragraph>
        </span>
      </Container>
      <Title>Suggested</Title>
      <MovieContainer>
        {data.suggestions.map(movie => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.rating}
            // 이미지 경로
            poster={movie.medium_cover_image}
          />
        ))}
      </MovieContainer>
    </>
  );
};

export default withRouter(Detail);
