<template>
  <div class="VisualDataEditor">
    <ul>
      <li v-for="section in data" v-bind:key="section.title">
        <Section v-bind:sectionData="section" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Section from "@/components/Section.vue";

export default Vue.extend({
  name: "VisualDataEditor",
  computed: {
    data() {
      return this.$store.state.data;
    }
  },
  components: {
    Section
  }
});
</script>

<style scoped>
li {
  text-align: left;
}
</style>
