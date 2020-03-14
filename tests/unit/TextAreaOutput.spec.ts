import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import TextAreaOutput from "@/components/TextAreaOutput.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("TextAreaOutput.vue", () => {
  it("displays given text", async () => {
    const wrapper = shallowMount(TextAreaOutput, {
      mocks: { $store: { getters: { json: "TEST DISPLAY TEXT" } } }
    });

    const t = wrapper.find("textarea");

    expect(t.isVisible()).toBe(true);
    expect((t.element as HTMLTextAreaElement).value).toBe("TEST DISPLAY TEXT");
  });

  it("commits SET_JSON mutation upon change", () => {
    const mutations = { SET_JSON: jest.fn() };
    const store = new Vuex.Store({ mutations });
    const wrapper = shallowMount(TextAreaOutput, { store, localVue });

    wrapper.find("textarea").setValue("TEST INPUT TEXT");

    expect(mutations.SET_JSON).toHaveBeenCalledWith({}, "TEST INPUT TEXT");
  });
});
