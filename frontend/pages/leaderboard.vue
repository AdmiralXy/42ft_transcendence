<template>
  <div>
    <div class="container pt-3">
      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>World ranking</th>
                  <th>Name</th>
                  <th>MMR</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in users">
                  <td>#{{ index + 1 }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.score }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  layout: "app",
  data () {
    return {
      users: [
        { id: 1, name: "John Doe", score: 100 },
        { id: 2, name: "Jane Doe", score: 90 },
        { id: 3, name: "Jack Doe", score: 80 },
        { id: 4, name: "Jill Doe", score: 70 },
        { id: 5, name: "Joe Doe", score: 60 },
        { id: 6, name: "Jenny Doe", score: 50 },
        { id: 7, name: "Juan Doe", score: 40 },
        { id: 8, name: "Jenny Doe", score: 30 },
        { id: 9, name: "Juan Doe", score: 20 },
        { id: 10, name: "Jenny Doe", score: 10 },
        { id: 11, name: "Juan Doe", score: 10 },
        { id: 12, name: "Jenny Doe", score: 10 },
        { id: 13, name: "Juan Doe", score: 10 },
        { id: 14, name: "Jenny Doe", score: 10 },
        { id: 15, name: "Juan Doe", score: 10 },
        { id: 16, name: "Jenny Doe", score: 10 },
        { id: 17, name: "Juan Doe", score: 10 },
        { id: 18, name: "Jenny Doe", score: 10 },
        { id: 19, name: "Juan Doe", score: 10 },
        { id: 20, name: "Jenny Doe", score: 10 },
        { id: 21, name: "Juan Doe", score: 10 },
        { id: 22, name: "Jenny Doe", score: 10 },
        { id: 23, name: "Juan Doe", score: 10 },
        { id: 24, name: "Jenny Doe", score: 10 },
        { id: 25, name: "Juan Doe", score: 10 },
        { id: 26, name: "Jenny Doe", score: 10 },
        { id: 27, name: "Juan Doe", score: 10 },
        { id: 28, name: "Jenny Doe", score: 10 },
        { id: 29, name: "Juan Doe", score: 10 },
        { id: 30, name: "Jenny Doe", score: 10 },
        { id: 31, name: "Juan Doe", score: 10 },
        { id: 32, name: "Jenny Doe", score: 10 },
        { id: 33, name: "Juan Doe", score: 10 },
        { id: 34, name: "Jenny Doe", score: 10 },
        { id: 35, name: "Juan Doe", score: 10 },
        { id: 36, name: "Jenny Doe", score: 10 },
        { id: 37, name: "Juan Doe", score: 10 },
        { id: 38, name: "Jenny Doe", score: 20 }
      ]
    };
  }
})
</script>

<style lang="scss">
h3 {
  margin-top: 0;
}

tr {
  color: #fff;
}

td {
  color: #fff;
  cursor: pointer;
  border-top: unset !important;
  border-bottom: unset !important;
}

tr:hover {
  background-color: rgba(16, 18, 27, 0.4);
}

.table-striped tbody tr:nth-of-type(odd):hover {
  background-color: rgba(16, 18, 27, 0.4);
}
</style>
