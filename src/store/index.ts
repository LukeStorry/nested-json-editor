import Vue from "vue";
import Vuex from "vuex";
import { SectionList } from "@/NestedData";
import placeHolderData from "@/store/placeHolderData";
import { addMissingFields } from "./utils";
import { mutations } from "./mutations";
import { getters } from "./getters";

Vue.use(Vuex);

export interface State {
  sectionList: SectionList;
}

export default new Vuex.Store<State>({
  state: {
    sectionList: placeHolderData.map(addMissingFields)
  },
  mutations,
  getters
});
