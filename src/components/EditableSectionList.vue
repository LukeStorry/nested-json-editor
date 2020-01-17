<template>
  <div class="EditableSectionList">
    <ul>
      <li v-for="section in sections" :key="section.title">
        <Section :section-id="section.id" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueDraggable from "vue-draggable";
import { VueDraggableEvent } from "vue-draggable/types/vue-draggable-options";
import { findSectionById } from "@/utils/ids";
import { SectionList } from "@/NestedAccordionData";

Vue.use(VueDraggable);

export default Vue.extend({
  name: "EditableSectionList",
  // data() {
  //   return {
  //     options: {
  //       onDrop(event: VueDraggableEvent) {
  //         // eslint-disable-next-line no-console
  //         console.log(event);
  //       },
  //     }
  //   },

  components: {
    Section: () => import("./Section.vue")
  },
  props: ["parentId"],
  computed: {
    sections(): SectionList {
      if (!this.parentId) return this.$store.state.data;
      return findSectionById(this.parentId, this.$store.state.data)!.children!;
    }
  }
});
</script>

<!--<style scoped>-->
<!--.drag-wrapper {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--}-->

<!--ul {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  padding: 3px !important;-->
<!--  min-height: 70vh;-->
<!--  width: 100px;-->
<!--  float: left;-->
<!--  list-style-type: none;-->
<!--  overflow-y: auto;-->
<!--  border: 2px solid #888;-->
<!--  border-radius: 0.2em;-->
<!--  background: #8adccc;-->
<!--  color: #555;-->
<!--  margin-right: 5px;-->
<!--}-->

<!--/* drop target state */-->
<!--ul[aria-dropeffect="move"] {-->
<!--  border-color: #68b;-->
<!--  background: #fff;-->
<!--}-->

<!--/* drop target focus and dragover state */-->
<!--ul[aria-dropeffect="move"]:focus,-->
<!--ul[aria-dropeffect="move"].dragover {-->
<!--  outline: none;-->
<!--  box-shadow: 0 0 0 1px #fff, 0 0 0 3px #68b;-->
<!--}-->

<!--/* draggable items */-->
<!--li {-->
<!--  display: block;-->
<!--  list-style-type: none;-->
<!--  margin: 0 0 2px 0;-->
<!--  padding: 0.2em 0.4em;-->
<!--  border-radius: 0.2em;-->
<!--  line-height: 1.3;-->
<!--}-->

<!--li:hover {-->
<!--  box-shadow: 0 0 0 2px #68b, inset 0 0 0 1px #ddd;-->
<!--}-->

<!--/* items focus state */-->
<!--li:focus {-->
<!--  outline: none;-->
<!--  box-shadow: 0 0 0 2px #68b, inset 0 0 0 1px #ddd;-->
<!--}-->

<!--/* items grabbed state */-->
<!--li[aria-grabbed="true"] {-->
<!--  background: #5cc1a6;-->
<!--  color: #fff;-->
<!--}-->

<!--@keyframes nodeInserted {-->
<!--  from {-->
<!--    opacity: 0.2;-->
<!--  }-->
<!--  to {-->
<!--    opacity: 0.8;-->
<!--  }-->
<!--}-->

<!--.item-dropzone-area {-->
<!--  height: 2rem;-->
<!--  background: #888;-->
<!--  opacity: 0.8;-->
<!--  animation-duration: 0.5s;-->
<!--  animation-name: nodeInserted;-->
<!--}-->
<!--</style>-->
