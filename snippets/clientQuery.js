client
  .query({
    query: gql`
    {
      posts{
        title
      }
    }
    `
  })
  .then(result => {
    console.log('!!!',result)
  })
  .catch(e=>{
    console.error('!!!error: ',e)
  })



const PostTitles = () => (
  <Query
    query={gql`
      {
      posts{
        title
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      console.log('PostTitles组件：',loading,error,data)
      if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>Error :(</Text>;

      return data.posts.map(({ title,id }) => (
        <View key={title}>
          <Text>
          {title}
          </Text>
        </View>
      ));
    }}
  </Query>
);