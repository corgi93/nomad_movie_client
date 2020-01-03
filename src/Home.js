import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { HOME_PAGE } from "./queries";
import Movie from "./Movie";
import { useQuery } from "@apollo/react-hooks";

// apollo는 graphql 클라이언트와 관련. react-apollo는 리액트와 아폴로를 연결.

/*
 stateless컴포넌트로 보면 된다.
 Qeury컴포넌트에서 하나의 룰이 있다.
  - children 함수를 줘야 함
  - render prop 이라고 함
  - 그리고 chidren함수는 반!드!시! component를 return해야함

Apollo Query를 이용해 
json, response, return, fetch, get url같은 작업 없이 간단하게 
내가 원하는 쿼리를 넣고 데이터를 얻고 패칭할 수 있다ㅎㅎ
*/

// children 함수인 loading, data, error가 있고

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 0.7fr);
  flex-wrap: wrap;
  justify-items: center;
`;

const Home = () => {
    const { data, error, loading } = useQuery(HOME_PAGE);
    return (
      <Container>
        <Helmet>
          <title>Home | MovieQL</title>
        </Helmet>
        {loading && "Loading"}
        {error && "Something is wrong"}
        {!loading &&
          data &&
          data.movies &&
          data.movies.map(movie => (
            <Movie
              id={movie.id}
              key={movie.id}
              poster={movie.medium_cover_image}
              title={movie.title}
              rating={movie.rating}
            />
          ))}
      </Container>
    );
  };
  
  export default Home;