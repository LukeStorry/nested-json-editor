import EditableSectionList from "*.vue";
<template>
  <div :id="sectionId" class="Section">
    <input v-model.lazy="title" type="text" />
    <textarea v-model.lazy="text" type="text" />
    <EditableSectionList :parent-id="sectionData.id" class="children-box" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditableSectionList from "@/components/EditableSectionList.vue";
import { SectionData, SectionList } from "@/NestedAccordionData";

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
  text-align: right;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: #eee;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  display: block;
  padding: 0.2rem;
  margin: 0.5rem;
  height: 1.5rem;
  font-size: 1.2rem;
  font-weight: 400;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
textarea {
  display: block;
  height: 2rem;
  padding: 0.2rem;
  margin: 0.5rem;
  font-size: 1rem;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  width: 90%;
}
.children-box {
  border: 1px solid #aaa;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.25rem;
  min-width: 80%;
}
</style>
