import Vue from "vue";
import Vuex from "vuex";
import { SectionData, SectionList } from "@/NestedAccordionData";
import placeHolderData from "@/store/placeHolderData";

Vue.use(Vuex);

const addIds = (sectionList: SectionList): void =>
  sectionList.forEach(section => {
    section.id = Math.random()
      .toString(36)
      .substr(2, 9);
    if (section.children) addIds(section.children);
  });

const findSectionById = (
  id: string | undefined,
  list: SectionList
): SectionData | undefined => {
  for (const section of list) {
    if (section.id === id) return section;
    if (!section.children) continue;
    const found = findSectionById(id, section.children);
    if (found) return found;
  }
  return undefined;
};

addIds(placeHolderData);
export default new Vuex.Store({
  state: {
    sectionList: placeHolderData as SectionList
  },
  mutations: {
    setData(state: State, payload: SectionList) {
      addIds(payload);
      state.sectionList = payload;
    },
    updateSection(state: State, payload: SectionData) {
      const old: SectionData = findSectionById(payload.id, state.sectionList)!;
      old.title = payload.title;
      old.text = payload.text;
      old.children = payload.children;
    }
  },
  getters: {
    allSections: (state: State): SectionList => state.sectionList,
    section: (state: State): ((id: string) => SectionData) => id =>
      Object.assign({}, findSectionById(id, state.sectionList)!)
  }
});

export interface State {
  sectionList: SectionList;
}
