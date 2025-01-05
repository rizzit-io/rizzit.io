/**
 * @type {import(esbuild).BuildOptions}
 */
const publicBuildOptions = {
    entryPoints: [
        'public/*'
    ],
    outdir: 'build',
    loader: {
        '.html': 'copy',
        '.json': 'copy',
        '.css': 'copy',
        '.png': 'copy',
        '.svg': 'copy',
    }
}

export default publicBuildOptions
