<template>
  <div class="TextAreaOutput">
    <textarea v-model="text" />
    <a
      class="save-button"
      download="data.json"
      :href="'data:application/octet-stream,' + encodeURIComponent(text)"
    >
      💾
    </a>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SectionList } from "@/NestedData";

const isValid = (value: any): boolean => {
  if (!(value instanceof Array)) return false;
  // TODO make proper validator
  return "title" in value[0];
};

export default Vue.extend({
  name: "TextAreaOutput",
  computed: {
    text: {
      get() {
        const string: string = JSON.stringify(
          this.$store.getters.allSections,
          null,
          2
        )!!;
        return string ? string.replace(/,\n *"id": ".*"/g, "") : "";
      },
      set(value: string) {
        // TODO catch json parse errors
        const newData: SectionList = JSON.parse(value);

        if (isValid(newData)) {
          this.$store.commit("setAllData", newData);
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

.save-button {
  margin: auto;
  display: block;
  font-size: 2rem;
  padding: 1rem;
  text-decoration: none;
}
</style>
