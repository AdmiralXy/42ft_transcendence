<template>
  <div class="content-section">
    <div class="content-section-title">Create group</div>
    <div class="groups-card">
      <div class="group-card">
       <span>
         <img v-if="form.isPrivate" @click="togglePrivate" src="@/assets/img/svg/lock-closed.svg" class="clickable-img">
         <img v-else @click="togglePrivate" src="@/assets/img/svg/lock-opened.svg" class="clickable-img">
        New {{ form.isPrivate ? 'private' : 'public' }} group
       </span>
        <div class="group-card-buttons">
          <form>
            <input type="text" placeholder="Group name" class="app-input">
            <ButtonLoader :text="'Join'" class="app-button">Create</ButtonLoader>
          </form>
        </div>
      </div>
    </div>
    <div class="content-section-title">Available groups</div>
    <div class="groups-card">
      <div v-for="group in groups" class="group-card">
       <span>
        <img v-if="group.isPrivate" src="@/assets/img/svg/lock-closed.svg">
         <img v-else src="@/assets/img/svg/lock-opened.svg">
        {{ group.name }}
       </span>
        <div class="group-card-buttons">
          <ButtonLoader :text="'Join'" class="app-button">Join</ButtonLoader>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ButtonLoader from "~/components/ButtonLoader.vue";

export default Vue.extend({
  layout: "app",
  data () {
    return {
      form: {
        name: "",
        isPrivate: false
      },
      groups: [
        {
          id: 1,
          name: "Group 1",
          isPrivate: false
        },
        {
          id: 2,
          name: "Group 2",
          isPrivate: true
        },
        {
          id: 3,
          name: "Group 3",
          isPrivate: false
        },
        {
          id: 4,
          name: "Group 4",
          isPrivate: true
        },
        {
          id: 5,
          name: "Group 5",
          isPrivate: false
        },
        {
          id: 6,
          name: "Group 6",
          isPrivate: true
        },
        {
          id: 7,
          name: "Group 7",
          isPrivate: false
        },
        {
          id: 8,
          name: "Group 8",
          isPrivate: true
        },
        {
          id: 9,
          name: "Group 9",
          isPrivate: false
        },
        {
          id: 10,
          name: "Group 10",
          isPrivate: true
        },
        {
          id: 11,
          name: "Group 11",
          isPrivate: false
        },
        {
          id: 12,
          name: "Group 12",
          isPrivate: true
        },
        {
          id: 13,
          name: "Group 13",
          isPrivate: false
        },
        {
          id: 14,
          name: "Group 14",
          isPrivate: true
        },
        {
          id: 15,
          name: "Group 15",
          isPrivate: false
        },
        {
          id: 16,
          name: "Group 16",
          isPrivate: true
        },
        {
          id: 17,
          name: "Group 17",
          isPrivate: false
        },
        {
          id: 18,
          name: "Group 18",
          isPrivate: true
        },
        {
          id: 19,
          name: "Group 19",
          isPrivate: false
        },
      ]
    }
  },
  methods: {
    togglePrivate() : void {
      this.form.isPrivate = !this.form.isPrivate;
    },
  },
  components: {
    ButtonLoader
  },
})
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.groups-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: calc(100% + 20px);
}

.group-card {
  display: flex;
  flex-direction: column;
  width: calc(33.3% - 20px);
  font-size: 16px;
  background-color: $--content-bg;
  border-radius: 14px;
  border: 1px solid $--theme-bg-color;
  padding: 20px;
  transition: 0.3s ease;
  margin-bottom: 25px;
}

.group-card span {
  display: flex;
  align-items: center;
}

.group-card img {
  width: 28px;
  border-radius: 6px;
  margin-right: 12px;
  flex-shrink: 0;
}

.group-card-buttons {
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-top: 26px;
}

.app-button {
  margin-top: 15px;
  min-width: 150px;
}

</style>
