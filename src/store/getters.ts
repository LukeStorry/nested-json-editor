import { SectionData, SectionList } from "@/NestedData";
import { findSectionById, calculateDepth } from "./utils";
import { State } from "./index";
import { GetterTree } from "vuex";

export const getters: GetterTree<State, State> = {
  json: (state: State): string =>
    state.sectionList.length
      ? JSON.stringify(state.sectionList, null, 2).replace(
          /,\n *"id": ".*"/g,
          ""
        )
      : "",

  section: (state: State): ((id: string) => SectionData) => id =>
    findSectionById(id, state.sectionList)!,

  children: (state: State): ((parentId: string) => SectionList) => parentId => {
    return parentId === "root"
      ? state.sectionList
      : findSectionById(parentId, state.sectionList)!.children || [];
  },

  sectionDepth: (state: State): ((id: string) => number) => id =>
    calculateDepth(id, state.sectionList)!
};
