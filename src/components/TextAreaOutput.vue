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
import { Mutations } from "@/store/mutations";

export default Vue.extend({
  name: "TextAreaOutput",
  computed: {
    text: {
      get() {
        return this.$store.getters.json;
      },
      set(value: string) {
        this.$store.commit(Mutations.SET_JSON, value);
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
