import { SectionData, SectionList } from "@/NestedAccordionData";

export const addIds = (sectionList: SectionList): void =>
  sectionList.forEach(section => {
    section.id = Math.random()
      .toString(36)
      .substr(2, 9);
    if (section.children) addIds(section.children);
  });

export const findSectionById = (
  id: string | undefined,
  list: SectionList
): SectionData | undefined => {
  for (const section of list) {
    if (section.id == id) return section;
    if (!section.children) continue;
    const found = findSectionById(id, section.children);
    if (found) return found;
  }
  return undefined;
};
