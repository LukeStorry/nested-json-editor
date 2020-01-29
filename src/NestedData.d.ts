export declare type SectionData = {
  id?: string;
  title: string;
  text?: string;
  children: Array<SectionData>;
};

export declare type SectionList = Array<SectionData>;
