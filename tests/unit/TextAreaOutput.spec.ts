import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import TextAreaOutput from "@/components/TextAreaOutput.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("TextAreaOutput.vue", () => {
  it("renders simple object json", async () => {
    const getters = {
      data: () => [
        {
          title: "title1"
        },
        {
          title: "title2"
        }
      ]
    };

    const store = new Vuex.Store({
      getters
    });
    const wrapper = mount(TextAreaOutput, { store, localVue });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    const t = wrapper.find("textarea");

    expect(t.isVisible()).toBe(true);

    // TODO fix this line
    expect((t.element as HTMLTextAreaElement).value).toBe("html");
  });

  it("commits a SetData action upon valid change", () => {
    const mutations = { setData: jest.fn() };
    const store = new Vuex.Store({ mutations });
    const wrapper = shallowMount(TextAreaOutput, { store, localVue });

    wrapper.find("textarea").setValue('[{"title":"test input title"}]');

    const expectedNewData = [{ title: "test input title" }];
    expect(mutations.setData).toHaveBeenCalledWith({}, expectedNewData);
  });

  it(" doesn't commit a SetData action upon invalid change", () => {
    const mutations = { setData: jest.fn() };
    const store = new Vuex.Store({ mutations });
    const wrapper = shallowMount(TextAreaOutput, { store, localVue });

    wrapper.find("textarea").setValue('{"bad":"bad"}');

    expect(mutations.setData).not.toHaveBeenCalled();
  });
});
