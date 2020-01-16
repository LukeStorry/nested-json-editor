import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import TextAreaOutput from "@/components/TextAreaOutput.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("TextAreaOutput.vue", () => {
  it("renders displays nicely formatted json", async () => {
    const wrapper = shallowMount(TextAreaOutput, {
      mocks: {
        $store: {
          state: {
            data: [{ title: "title1", id: "abcd" }, { title: "title2" }]
          }
        }
      }
    });

    const t = wrapper.find("textarea");

    expect(t.isVisible()).toBe(true);
    expect((t.element as HTMLTextAreaElement).value).toBe(
      `[
  {
    "title": "title1"
  },
  {
    "title": "title2"
  }
]`
    );
  });

  it("commits a SetData action upon valid change", () => {
    const mutations = { setData: jest.fn() };
    const store = new Vuex.Store({ mutations });
    const wrapper = shallowMount(TextAreaOutput, { store, localVue });

    wrapper.find("textarea").setValue('[{"title":"test input title"}]');

    const expectedNewData = [{ title: "test input title" }];
    expect(mutations.setData).toHaveBeenCalledWith({}, expectedNewData);
  });

  it("doesn't commit a SetData action upon invalid change", () => {
    const mutations = { setData: jest.fn() };
    const store = new Vuex.Store({ mutations });
    const wrapper = shallowMount(TextAreaOutput, { store, localVue });

    wrapper.find("textarea").setValue('{"bad":"bad"}');

    expect(mutations.setData).not.toHaveBeenCalled();
  });
});
