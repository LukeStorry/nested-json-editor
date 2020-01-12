<template>
  <div id="app">
    <h1>Data Editor for the nested-accordion html-generator</h1>
    <VisualDataEditor />
    <TextAreaOutput />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Vuex from "vuex";
import VisualDataEditor from "./components/VisualDataEditor.vue";
import TextAreaOutput from "./components/TextAreaOutput.vue";
import { NestedAccordionData } from "./NestedAccordionData";

Vue.use(Vuex);

const initialData: NestedAccordionData = [
  {
    title: "Grandparent 1",
    text: "Grandparent 1 description.",
    children: [
      {
        title: "Parent 1"
      },
      {
        title: "Parent 2",
        children: [
          {
            title: "First Child",
            text: "I am the first child"
          },
          {
            title: "Second Child",
            text: "I am the first child"
          }
        ]
      }
    ]
  },
  {
    title: "Grandparent 2",
    text: "Grandparent 2 description.",
    children: [
      {
        title: "Parent 3",
        children: [
          {
            title: "First Child",
            text: "I am the first child"
          },
          {
            title: "Second Child",
            text: "I am the first child"
          }
        ]
      }
    ]
  }
];

const store = new Vuex.Store({
  state: {
    data: initialData
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    }
  }
});

export default Vue.extend({
  name: "app",
  components: {
    VisualDataEditor,
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
