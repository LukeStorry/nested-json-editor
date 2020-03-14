import {
  SectionData,
  SectionList,
  PartialSectionDataList,
  PartialSectionData
} from "@/NestedData";

export const generateId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

export const addMissingFields = (partial: PartialSectionData): SectionData => {
  partial.id = partial.id || generateId();
  partial.text = partial.text || "";
  partial.children = partial.children || [];
  if (partial.children) partial.children.map(addMissingFields);
  return partial as SectionData;
};

export const findSectionById = (
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

export const calculateDepth = (
  id: string,
  list: SectionList,
  depth = 0
): number | undefined => {
  for (const section of list) {
    if (section.id === id) return depth;
    if (!section.children) continue;
    const found = calculateDepth(id, section.children, depth + 1);
    if (found) return found;
  }
  return undefined;
};

export const isValid = (value: any): boolean => {
  if (!(value instanceof Array)) return false;
  // TODO make proper validator
  return "title" in value[0];
};
