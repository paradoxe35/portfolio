import FirebaseApp from "utils/firebase"
import { Project, Resume } from "types";

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

const dataPoint = <T>(param: Param, single: boolean = false) => {
    let content = flamelinkApp.content.get(param)

    if (!single) {
        content = content.then((data: any) => {
            return param.entryId ? data as T : data ? Object.keys(data).map(key => data[key]) : []
        })
    }

    return param.entryId ? content as Promise<T> : content as Promise<Array<T>>
}


const db = {
    projects: dataPoint({ schemaKey: 'projects' }) as Promise<Project[]>,
    getProject: (entryId: string) => dataPoint({ schemaKey: 'projects', entryId }) as Promise<Project>,
    resume: dataPoint({ schemaKey: 'resume' }, true) as Promise<Resume>
}


export { db }