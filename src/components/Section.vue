import EditableSectionList from "*.vue";
<template>
  <div :id="sectionId" class="Section">
    <input
      v-model.lazy="title"
      type="text"
      class="title"
      placeholder="Section Title"
    />
    <textarea
      v-model.lazy="text"
      type="text"
      class="text"
      placeholder="Section text"
    />
    <EditableSectionList :parent-id="sectionData.id" class="children-box" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditableSectionList from "@/components/EditableSectionList.vue";
import { SectionData, SectionList } from "@/NestedData";

export default Vue.extend({
  name: "Section",
  components: {
    EditableSectionList
  },
  props: { sectionId: { type: String, required: true } },
  computed: {
    sectionData: {
      get(): SectionData {
        return this.$store.getters.section(this.sectionId);
      }
    },
    title: {
      get(): string {
        return this.sectionData.title;
      },
      set(value: string) {
        this.$store.commit("updateTitle", { id: this.sectionId, title: value });
      }
    },
    text: {
      get(): string {
        return this.sectionData.text || "";
      },
      set(value: string) {
        this.$store.commit("updateText", { id: this.sectionId, text: value });
      }
    }
  }
});
</script>

<style scoped>
.Section {
  margin: -0.5rem 0.5rem 0.5rem 0.5rem;
  background-color: white;
  border: 3px solid darkgrey;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
}
.title {
  display: block;
  width: 100%;
  height: 1.5rem;
  padding: 0.2rem;
  border: none;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 400;
  background-color: darkgrey;
}
.text {
  display: block;
  width: 90%;
  height: 2rem;
  padding: 0.2rem;
  border: none;
  margin: 0.5rem;
  font-size: 1rem;
  resize: vertical;
}
.children-box {
  width: 90%;
  border: 3px solid lightgrey;
  background-color: whitesmoke;
}
</style>
