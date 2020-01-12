export declare type SectionData = {
  title: string;
  text?: string;
  children?: Array<SectionData>;
};

export declare type NestedAccordionData = Array<SectionData>;
