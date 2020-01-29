import Vue from "vue";
import Vuex from "vuex";
import { SectionData, SectionList } from "@/NestedData";
import placeHolderData from "@/store/placeHolderData";

Vue.use(Vuex);

const generateId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

const addIds = (sectionList: SectionList): void =>
  sectionList.forEach(section => {
    section.id = generateId();
    if (section.children) addIds(section.children);
  });

const addEmptyChildren = (sectionList: SectionList): void =>
  sectionList.forEach(section => {
    section.children = section.children || [];
    if (section.children) addEmptyChildren(section.children);
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
    setAllData(state: State, payload: SectionList) {
      addEmptyChildren(payload);
      state.sectionList = payload;
    },
    addSection(state: State, payload: SectionList) {
      payload.push({ title: "", text: "", id: generateId(), children: [] });
    },
    removeSection(
      state: State,
      payload: { sectionList: SectionList; sectionId: string }
    ) {
      const indexToRemove: number = payload.sectionList.findIndex(
        section => section.id === payload.sectionId
      );
      payload.sectionList.splice(indexToRemove, 1);
    },
    updateTitle(state: State, payload: { id: string; title: string }) {
      const section: SectionData = findSectionById(
        payload.id,
        state.sectionList
      )!;
      section.title = payload.title;
    },
    updateText(state: State, payload: { id: string; text: string }) {
      const section: SectionData = findSectionById(
        payload.id,
        state.sectionList
      )!;
      section.text = payload.text;
    },
    updateChildren(
      state: State,
      payload: { id: string; children: SectionList }
    ) {
      const section: SectionData = findSectionById(
        payload.id,
        state.sectionList
      )!;
      section.children = payload.children;
    }
  },
  getters: {
    allSections: (state: State): SectionList => state.sectionList,
    section: (state: State): ((id: string) => SectionData) => id =>
      findSectionById(id, state.sectionList)!
  }
});

export interface State {
  sectionList: SectionList;
}
