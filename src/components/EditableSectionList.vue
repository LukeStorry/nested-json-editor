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
import { Mutations } from "@/store/mutations";

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
        return this.$store.getters.children(this.parentId);
      },
      set(value: SectionList) {
        this.$store.commit(Mutations.UPDATE_CHILDREN, {
          id: this.parentId,
          children: value
        });
      }
    }
  },
  methods: {
    add() {
      this.$store.commit(Mutations.ADD_SECTION, this.sections);
    },
    remove(sectionId: string) {
      this.$store.commit(Mutations.REMOVE_SECTION, {
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
