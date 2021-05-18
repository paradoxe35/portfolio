import FirebaseApp from "utils/firebase"
import { Project } from "types";

import flamelink from 'flamelink/app'
import 'flamelink/cf/content'
import 'flamelink/cf/storage'


export const flamelinkApp = flamelink({
    firebaseApp: FirebaseApp,
    env: 'production',
    locale: 'en-US',
    dbType: 'cf'
})

type Param = {
    schemaKey?: string;
    entryId?: string | undefined;
    fields?: string[] | undefined;
    limitToLast?: number | undefined;
    limitToFirst?: number | undefined;
}

const dataPoint = <T>(param: Param) => {
    const content = flamelinkApp.content.get(param)
        .then((data: any) => {
            return param.entryId ? data as T : data ? Object.keys(data).map(key => data[key]) : []
        })
    return param.entryId ? content as Promise<T> : content as Promise<Array<T>>
}


const db = {
    projects: dataPoint({ schemaKey: 'projects' }) as Promise<Project[]>
}


export { db }