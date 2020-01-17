import EditableSectionList from "*.vue";
<template>
  <div :id="sectionId" class="Section">
    <input v-model.lazy="title" type="text" />
    <br />
    <textarea v-model.lazy="text" type="text" />
    <EditableSectionList :parent-id="sectionData.id" />
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
      },
      set(value: SectionData) {
        // TODO validation?
        this.$store.commit("updateSection", value);
      }
    },
    title: {
      get(): string {
        return this.sectionData.title;
      },
      set(value: string) {
        this.$store.commit("updateSection", {
          ...this.sectionData,
          title: value
        });
      }
    },
    text: {
      get(): string {
        return this.sectionData.text || "";
      },
      set(value: string) {
        this.$store.commit("updateSection", {
          ...this.sectionData,
          text: value
        });
      }
    }
  }
});
</script>

<style scoped>
.Section {
  text-align: left;
}
</style>
