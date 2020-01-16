import EditableSectionList from "*.vue";
<template>
  <div class="Section" v-bind:id="sectionData.id">
    <h5>{{ sectionData.title }}</h5>
    <p>{{ sectionData.text }}</p>
    <EditableSectionList v-bind:parentId="sectionData.id" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditableSectionList from "@/components/EditableSectionList.vue";

export default Vue.extend({
  name: "Section",
  props: ["sectionData"],
  components: {
    EditableSectionList
  }
});
</script>

<style scoped>
.Section {
  text-align: left;
}
</style>
