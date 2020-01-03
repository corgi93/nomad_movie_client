import ApolloClient from "apollo-boost";

// Apollo client는 특정 환경 설정이 필요
// apollo를 이용하면 graphql api의 데이터를 가져오기 매우 쉽다.

const client = new ApolloClient({
  uri: "https://movieql.now.sh"
});

export default client;