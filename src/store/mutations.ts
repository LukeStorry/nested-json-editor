import { SectionData, SectionList } from "@/NestedData";
import {
  isValid,
  generateId,
  findSectionById,
  addMissingFields
} from "./utils";
import { State } from "./index";
import { MutationTree } from "vuex";

export const Mutations = {
  SET_JSON: "SET_JSON",
  ADD_SECTION: "ADD_SECTION",
  REMOVE_SECTION: "REMOVE_SECTION",
  UPDATE_TITLE: "UPDATE_TITLE",
  UPDATE_TEXT: "UPDATE_TEXT",
  UPDATE_CHILDREN: "UPDATE_CHILDREN"
};

// TODO add tests

export const mutations: MutationTree<State> = {
  [Mutations.SET_JSON](state: State, payload: string) {
    const newObject = JSON.parse(payload);
    // TODO catch & show errors for json parse errors
    const newData: SectionList = newObject.map(addMissingFields);

    if (isValid(newData)) {
      state.sectionList = newData;
    }
  },

  [Mutations.ADD_SECTION](state: State, payload: SectionList) {
    payload.push({ title: "", text: "", id: generateId(), children: [] });
  },

  [Mutations.REMOVE_SECTION](
    state: State,
    payload: {
      sectionList: SectionList;
      sectionId: string;
    }
  ) {
    const indexToRemove: number = payload.sectionList.findIndex(
      section => section.id === payload.sectionId
    );
    payload.sectionList.splice(indexToRemove, 1);
  },

  [Mutations.UPDATE_TITLE](
    state: State,
    payload: {
      id: string;
      title: string;
    }
  ) {
    const section: SectionData = findSectionById(
      payload.id,
      state.sectionList
    )!;
    section.title = payload.title;
  },

  [Mutations.UPDATE_TEXT](
    state: State,
    payload: {
      id: string;
      text: string;
    }
  ) {
    const section: SectionData = findSectionById(
      payload.id,
      state.sectionList
    )!;
    section.text = payload.text;
  },

  [Mutations.UPDATE_CHILDREN](
    state: State,
    payload: {
      id: string;
      children: SectionList;
    }
  ) {
    if (payload.id == "root") state.sectionList = payload.children;
    else
      findSectionById(payload.id, state.sectionList)!.children =
        payload.children;
  }
};
