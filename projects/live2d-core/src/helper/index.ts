import {findAllModels, mergeModels} from "@/fs/index.js";
import {ResolveCdn, ResolveElementId, ResolveModels} from "@/types/index.js";

export function generateModelList(options: ResolveModels) {
    const models = mergeModels(options.domain || 'https://localhost:8080', findAllModels(options.models_folder || 'public/live2d'), options.models || []);
    if (models.length == 0) {
        throw new Error('At least one live2d model is required');
    }
    delete options.domain;
    delete options.models;
    delete options.models_folder;
    return models;
}

export function generateElementId(options: ResolveElementId) {
    const element_id = options.element_id || 'live2d-canvas';
    delete options.element_id;
    return element_id
}

export function generateCdn(options: ResolveCdn) {
    const cdn = options.cdn || 'https://cdn.jsdelivr.net/npm/@doki-land/live2d@latest/dist/l2d.umd.js';
    delete options.cdn;
    return cdn
}