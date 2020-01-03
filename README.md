## GraphQL - apollo client를 이용한 state관리

<br>
apollo client : state관리 라이브러리. (vs redux)
apollo client는 간단하게 GraphQL query를 작성하기만 하면 Apollo Client가 데이터를 요청하고 캐싱하여
UI를 업데이트 해줍니다.
 
apollo client를 사용하여 데이터를 가져오면 더 예측 가능하고 선언적인 방식으로 코드를 짤 수 있습니다.

### 특징

- 선언적 data fetching : load 상태를 수동으로 추적하지 않고 query 작성 및 데이터 수신
- moder react 설계 : hook같은 최신 react 기능 활용
- 보편적인 호환성 : 모든 GrapQL API에 빌드가능
- 뛰어난 개발 경험 : Typescript, Chrome Dev Tool , VS de 지원
- 점진적으로 적용 : 모든 Javascript에 적용가능
- 활발한 커뮤니티

### apollo 시작하기

- 필수 사항 : apollo client를 사용해 데이터를 가져오고 데이터를 업데이트하는 로컬 state를 관리하는 법

### Query

1.  loading / error / data 속성

    - useQuery hook에게 쿼리를 전달하고 graphQL의 쿼리 실행한 후 쿼리의 상태(loading / error / data)의 따라 서로 다른 UI 렌더링!

2.  Query결과 caching ( 데이터 바인딩 시 variables 옵션 )

    - apollo client가 서버에서 쿼리 결과를 가져올 때마다 해당 결과를 로컬로 자동 캐싱!! 동일한 쿼리는 후속 실행이 매우 빠름!
      (로딩이 거의 없다x. 이미 이전에 결과값이 로컬에 캐싱되어 저장되어 있어서)


    queries.js
    ```
    /*
    id에 따른 영화 정보를 불러오는 쿼리. 한 번 불러오면 다음에 불러올 때 loading이 없이 빠르게 렌더링된다!.
    아폴로의 캐싱덕분!
    */
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
    ```

    detail.js
    ```
    /*
    variables는 useQuery후크에서 제공하는 구성 옵션.
    GraphQL 쿼리에 전달하려는 모든 변수를 포함하는 객체.
    */

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

    ```

3.  pollInterval 옵션
    - 쿼리를 주기적으로 실행하여 서버와 거의 실시간 동기화하고 싶은 경우 hook에 pollInterval구성 옵션을 전달
    ```
     const { loading, error, data } = useQuery(GET_COINS_PRICE, {
         variable: {coin},
         pollInterval : 1000 // 1초마다
     })
    ```
4.  refetch 속성

    - 다시 가져오기를 사용해 고정 간격(pollInterval)을 사용하는 대신 특정 유저 작업에 대한 response로 쿼리 결과를 새로 고칠 수 있습니다.

    - 버튼 클릭시 UI가 새로운 개 사진으로 업데이트. refetch는 새로운 data를 바인딩하는 새로운 방법이지만 상태 복잡성을 초래합니다.

    ```
    function DogPhoto({ breed }){
        const { loading, error, data, refetch } = useQuery(GET_DOG_PHOTO_QUERY, {
            variables: {breed},
            skip: !breed
        })

        if (loading) return null;
        if (error) return `Error! ${error}`;
    }

    return (
        <div>
            <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
            <button onClick={() => refetch()}>Refetch!</button>
        </div>
    );
    ```

5.  networkStatus 속성
    - networkStatus 속성을 통해 쿼리 상태의 세분화된 정보를 제공.
    - notifyOnNetworkStatusChange옵션을 true설정. 리페치 되는 동안 쿼리 구성 요소를 다시 렌더링 하기위해

**_추가적인 속성 옵션은 document참고_**

<hr>

### Mutation(변형)

: Apollo client에서 Query로 백엔드에서 데이터를 가져왔다면 (useQuery를 이용)
useMutation 후크를 이용해 받아몬 데이터를 mutation으로 업데이트 해보려고 합니다.
useMutation 호크를 이용해 GraphQL 서버에 업데이트를 보내는 방법을 보여줍니다.

### mutation 실행하기
