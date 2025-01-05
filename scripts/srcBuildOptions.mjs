/**
 * @type {import(esbuild).BuildOptions}
 */
const srcBuildOptions = {
  entryPoints: [
    'src/index.ts'
  ],
  bundle: true,
  outfile: 'build/bundle.js',
  minify: true
}

export default srcBuildOptions
