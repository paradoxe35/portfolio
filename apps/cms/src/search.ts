import { FirebaseCollections, Project, Skill } from "@repo/contracts";
import { FirestoreTextSearchController } from "firecms";

type Searchable = FirebaseCollections.PROJECTS | FirebaseCollections.SKILLS;

type DataType<T extends Searchable> = {
  [FirebaseCollections.PROJECTS]: Partial<Project>;
  [FirebaseCollections.SKILLS]: Partial<Skill>;
}[T];

export const LOCAL_DATA = new (class {
  private data = new Map<
    Searchable,
    Map<string, Partial<Project> | Partial<Skill>>
  >();

  /**
   * Set data for a given type.
   *
   * @param type
   * @param data
   */
  setData<T extends Searchable>(type: T, id: string, data: DataType<T>) {
    const map = this.data.get(type);
    if (!map) {
      this.data.set(type, new Map());
    }

    this.data.get(type)?.set(id, { ...data, id });
  }

  /**
   *
   * Search for a given string in the local data.
   *
   * @param type
   * @param searchableFields
   * @returns
   */
  async search<T extends Searchable>(
    type: T,
    searchableFields: (keyof DataType<T>)[],
    searchString: string,
  ): Promise<string[]> {
    const searchValue = searchString.trim().toLowerCase();
    if (!searchValue) {
      return [];
    }

    const results = this.data.get(type)?.values();

    const filtered = Array.from(results || []).filter((item) => {
      return searchableFields.some((field) => {
        const value = item[field as keyof typeof item];
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchValue);
        }
        return false;
      });
    });

    return filtered.map((item) => item.id!);
  }
})();

export const textSearchController: FirestoreTextSearchController = ({
  path,
  searchString,
}) => {
  const searchValue = searchString.trim();
  if (!searchValue) {
    return undefined;
  }

  switch (path) {
    case FirebaseCollections.PROJECTS:
      return LOCAL_DATA.search(
        FirebaseCollections.PROJECTS,
        ["title"],
        searchString,
      );

    case FirebaseCollections.SKILLS:
      return LOCAL_DATA.search(
        FirebaseCollections.SKILLS,
        ["name"],
        searchString,
      );
    default:
      return undefined;
  }
};
