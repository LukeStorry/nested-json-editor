import EditableSectionList from "*.vue";
<template>
  <div :id="sectionData.id" class="Section">
    <h5>{{ sectionData.title }}</h5>
    <p>{{ sectionData.text }}</p>
    <EditableSectionList :parent-id="sectionData.id" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditableSectionList from "@/components/EditableSectionList.vue";
import { SectionData } from "@/NestedAccordionData";
import { findSectionById } from "@/utils/ids";

export default Vue.extend({
  name: "Section",
  components: {
    EditableSectionList
  },
  props: ["sectionId"],
  computed: {
    sectionData(): SectionData {
      return findSectionById(this.sectionId, this.$store.state.data)!;
    }
  }
});
</script>

<style scoped>
.Section {
  text-align: left;
}
</style>
