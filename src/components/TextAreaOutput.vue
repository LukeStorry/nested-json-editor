<template>
  <div class="TextAreaOutput">
    <textarea v-model="data" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SectionList } from "@/NestedAccordionData";

const isValid = (value: any): boolean => {
  if (!(value instanceof Array)) return false;
  // TODO make proper validator
  return "title" in value[0];
};

export default Vue.extend({
  name: "TextAreaOutput",
  computed: {
    data: {
      get() {
        return JSON.stringify(this.$store.state.data, null, 2).replace(
          /,\n *"id":.*/g,
          ""
        );
      },
      set(value: string) {
        // TODO catch json parse errors
        const newData: SectionList = JSON.parse(value);

        if (isValid(newData)) {
          this.$store.commit("setData", newData);
        }
      }
    }
  }
});
</script>

<style scoped>
textarea {
  width: 80%;
  height: 20rem;
  border: 3px solid lightgrey;
  padding: 0.5rem;
  margin: 2rem;
  font-family: monospace;
}
</style>
