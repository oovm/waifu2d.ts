import { minimatch } from 'minimatch';

export function allowShowLive2D(currentPath: string, includePaths: string[], excludePaths: string[]): boolean {
    // 如果在排除列表中，则不显示
    if (excludePaths.some(pattern => minimatch(currentPath, pattern))) {
        return false;
    }

    // 如果有包含列表，则只在包含列表中的路径显示
    if (includePaths.length > 0) {
        return includePaths.some(pattern => minimatch(currentPath, pattern));
    }

    // 默认显示所有
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




}