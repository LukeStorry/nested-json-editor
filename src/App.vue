<template>
  <div id="app">
    <h1>Data Editor for the nested-accordion html-generator</h1>
    <EditableSectionList />
    <TextAreaOutput />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditableSectionList from "@/components/EditableSectionList.vue";
import TextAreaOutput from "@/components/TextAreaOutput.vue";
import store from "@/store";

export default Vue.extend({
  name: "App",
  components: {
    EditableSectionList,
    TextAreaOutput
  },
  store
});
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #135;
  margin-top: 60px;
}
</style>
