import {ModelOptions} from "@/types/ModelOptions.js";


export type ResolveModels = {
    domain?: string,
    models?: ModelOptions[]
    models_folder?: string
}

export type ResolveElementId = {
    element_id?: string
}

export type ResolveCdn = {
    cdn?: string
}
