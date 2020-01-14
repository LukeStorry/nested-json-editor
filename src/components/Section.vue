<template>
  <div class="Section">
    <h5>{{ sectionData.title }}</h5>
    <p>{{ sectionData.text }}</p>
    <ul>
      <li
        v-for="childSection in sectionData.children"
        v-bind:key="childSection.title"
      >
        <Section v-bind:sectionData="childSection" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SectionData } from "@/NestedAccordionData";

export default Vue.extend({
  name: "Section",
  props: {
    sectionData: {
      type: Object as () => SectionData
    }
  }
});
</script>

<style scoped>
li {
  text-align: left;
}
</style>
