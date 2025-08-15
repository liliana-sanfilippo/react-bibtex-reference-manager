import * as fs from 'fs';
import * as path from 'path';

export function importAllBibFiles(folderPath: string): string[] {
    const files = fs.readdirSync(folderPath);
    const txtFiles = files.filter(file => path.extname(file).toLowerCase() === '.txt');

    return txtFiles.map(file => {
        const fullPath = path.join(folderPath, file);
        return fs.readFileSync(fullPath, 'utf-8');
    });
}


export async function importAllBibFilesAsync(fileNames: string[]): Promise<string[]> {
    const contents = await Promise.all(
        fileNames.map(async (file) => {
            const res = await fetch(`${file}`);
            return await res.text();
        })
    );
    return contents;
}

export async function importBibFileAsync(file: string): Promise<string[]> {
    const res = await fetch(file);
    const text =  await res.text();
    return [text];
}




