<template>
  <draggable v-model="sections" group="all" :animation="500">
    <Section
      v-for="section in sections"
      :key="section.id"
      :section-id="section.id"
    />
  </draggable>
</template>

<script lang="ts">
import Vue from "vue";
import { SectionList } from "@/NestedAccordionData";
import draggable from "vuedraggable";

export default Vue.extend({
  name: "EditableSectionList",
  components: {
    draggable,
    Section: () => import("./Section.vue")
  },
  props: { parentId: { type: String, default: "root" } },

  computed: {
    sections: {
      get(): SectionList {
        return this.parentId === "root"
          ? this.$store.getters.allSections
          : this.$store.getters.section(this.parentId).children || [];
      },
      set(value: SectionList) {
        console.log("set", this.parentId);
        if (this.parentId === "root") this.$store.commit("setAllData", value);
        else
          this.$store.commit("updateChildren", {
            id: this.parentId,
            children: value
          });
      }
    }
  }
});
</script>
