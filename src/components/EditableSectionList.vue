<template>
  <draggable v-model="sections" group="all" :animation="500">
    <div v-for="section in sections" :key="section.id">
      <button class="remove-button" @click="remove(section.id)">🗑️</button>
      <Section :section-id="section.id" />
    </div>
    <div slot="footer" key="footer" role="group">
      <button class="add-button" @click="add">+</button>
    </div>
  </draggable>
</template>

<script lang="ts">
import Vue from "vue";
import { SectionList } from "@/NestedData";
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
        if (this.parentId === "root") this.$store.commit("setAllData", value);
        else
          this.$store.commit("updateChildren", {
            id: this.parentId,
            children: value
          });
      }
    }
  },
  methods: {
    add() {
      this.$store.commit("addSection", this.sections);
    },
    remove(sectionId: string) {
      this.$store.commit("removeSection", {
        sectionList: this.sections,
        sectionId: sectionId
      });
    }
  }
});
</script>

<style scoped>
.add-button {
  border: none;
  background-color: transparent;
}
.remove-button {
  position: relative;
  border: none;
  background-color: transparent;
  left: calc(50% - 1.5rem);
  top: 0.6rem;
}
</style>
