import { FirebaseApp } from "@/data/firebase";

import flamelink from "flamelink/app";
import "flamelink/cf/content";
import "flamelink/cf/storage";

export const flamelinkApp = flamelink({
  firebaseApp: FirebaseApp,
  env: "production",
  locale: "en-US",
  dbType: "cf",
});

type Param = {
  schemaKey?: string;
  entryId?: string | undefined;
  fields?: string[] | undefined;
  limitToLast?: number | undefined;
  limitToFirst?: number | undefined;
};

const dataPoint = <T>(param: Param, single: boolean = false) => {
  let content = flamelinkApp.content.get(param);

  if (!single) {
    content = content.then((data: any) => {
      return param.entryId
        ? (data as T)
        : data
        ? Object.keys(data).map((key) => data[key])
        : [];
    });
  }

  return param.entryId
    ? (content as Promise<T>)
    : (content as Promise<Array<T>>);
};

export async function normalizeCollectionImage<T>(
  datas: Promise<any[]>,
  attr: string
): Promise<T[]> {
  for (const data of await datas) {
    if (data[attr] && Array.isArray(data[attr])) {
      const images: string[] = [];
      for (const img of data[attr]) {
        if (img) {
          const url = await flamelinkApp.storage.getURL({ fileId: img.id });
          images.push(url);
        }
      }
      data[attr] = images;
    }
  }
  return datas;
}
