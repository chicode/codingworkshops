<template>
  <Query
    :query="require('@/graphql/AllWorkshops.gql')"
  >
    <template slot-scope="{ data: { allWorkshops } }">
      <h1>coding workshops</h1>
      <ul>
        <router-link
          v-for="workshop in allWorkshops"
          :to="`workshops/${workshop.name}`"
          :key="workshop.name"
          tag="li"
        >
          <li>
            <h2>{{ workshop.name }}</h2>
            <p>{{ workshop.description }}</p>
          </li>
        </router-link>
      </ul>
    </template>
  </Query>
</template>

<script>
import Query from '@/components/Query'

export default {
  components: { Query },
  name: 'home',
}
</script>
