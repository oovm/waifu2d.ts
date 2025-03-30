import { minimatch } from 'minimatch';
import { ModelOptions } from '@/types/index.js';
import path from 'node:path';
import fs from 'node:fs';

/**
 * 判断根据当前路径和指定的包含/排除规则，是否允许显示 Live2D 功能。
 *
 * @param currentPath 当前页面路径。
 * @param includePaths 包含 Live2D 功能的路径列表。
 * @param excludePaths 排除 Live2D 功能的路径列表。
 * @returns 如果满足显示条件返回 true，否则返回 false。
 *
 * @description
 *
 * 排除的优先级高于包括
 */
export function allowShowLive2D(currentPath: string, includePaths: string[], excludePaths: string[]): boolean {

    // 如果当前路径匹配任何排除路径规则，不显示 Live2D
    if (excludePaths.some(pattern => minimatch(currentPath, pattern))) {
        return false;
    }

    // 如果包含路径列表不为空，则仅当当前路径匹配任意包含路径规则时才显示 Live2D
    if (includePaths.length > 0) {
        return includePaths.some(pattern => minimatch(currentPath, pattern));
    }

    // 默认情况下，允许显示 Live2D
    return true;
}


/**
 * 找到文件夹里的所有模型的相对路径
 * @param folder
 * @param depth
 *
 * @returns 模型路径列表
 *
 * @description
 *
 * 模型需要以 `*.model.json` 或 `*.model3.json` 结尾
 */
export function findAllModels(folder: string, depth: number = 99): string[] {
    const models: string[] = [];
    for (const file of fs.readdirSync(folder)) {
        const filePath = path.join(folder, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (depth > 0) {
                models.push(...findAllModels(filePath, depth - 1));
            }
        } else if (file.endsWith('.model.json') || file.endsWith('.model3.json')) {
            models.push(filePath);
        }
   }
    return models;
}

/**
 * 合并模型函数
 * 该函数的目的是将一系列本地模型与远程模型选项合并，以生成一个新的模型列表
 * 它接受一个基础URL字符串，一个本地模型名称数组和一个远程模型选项数组作为输入
 *
 * @param base 基础URL字符串，用于解析相对URL
 * @param local 本地模型名称数组，这些模型将被合并到最终的模型列表中
 * @param remote 远程模型选项数组
 * @returns 返回一个新的模型 url 列表
 *
 * @description
 *
 * 本地模型的优先级更高, 本地模型根据自然序(Natural Sort)排列
 */
export function mergeModels(base: string, local: string[], remote: ModelOptions[]): string[] {
    const models: string[] = [];
    const url = new URL(base);
    for (const model of local) {
        models.push(new URL(model, url).href);
    }
    for (const model of remote) {
        models.push(model.model_url);
    }
    return models
}


