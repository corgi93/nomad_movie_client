import ApolloClient from 'apollo-boost';

// Apollo client는 특정 환경 설정이 필요
const client = new ApolloClient({
    uri : "https//movieql-osezlvyqsg.now.sh/"
})
export default client;