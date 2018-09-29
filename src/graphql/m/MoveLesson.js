export default (variables, queryVariables) => ({
  mutation: require('./MoveLesson.gql'),
  variables,
  refetchQueries: [
    {
      query: require('../q/WorkshopLessons.gql'),
      variables: queryVariables,
    },
  ],
})
