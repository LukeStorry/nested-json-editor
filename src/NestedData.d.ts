export declare type SectionData = {
  id: string;
  title: string;
  text: string;
  children: SectionList;
};
export declare type SectionList = Array<SectionData>;

export declare type PartialSectionData = {
  id?: string;
  title?: string;
  text?: string;
  children?: PartialSectionDataList;
};

export declare type PartialSectionDataList = Array<PartialSectionData>;
