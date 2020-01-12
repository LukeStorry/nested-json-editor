<template>
  <div class="VisualDataEditor">
    <ul>
      <li v-for="section in data" v-bind:key="section.title">
        {{ section.title }}
        <p>{{ section.text }}</p>
        <ul>
          <li
            v-for="subsection in section.children"
            v-bind:key="subsection.title"
          >
            {{ subsection.title }}
            <p>{{ subsection.text }}</p>
            <p>{{ subsection.children }}</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "VisualDataEditor",
  computed: {
    data() {
      return this.$store.state.data;
    }
  }
});
</script>

<style scoped>
li {
  text-align: left;
}
</style>
