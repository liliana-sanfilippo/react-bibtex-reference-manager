export async function importAllBibFilesAsync(fileNames: string[]): Promise<string[]> {
    return await Promise.all(
        fileNames.map(async (file) => {
            const res = await fetch(`${file}`);
            return await res.text();
        })
    );
}

export async function importBibFileAsync(file: string): Promise<string[]> {
    const res = await fetch(file);
    const text =  await res.text();
    return [text];
}




