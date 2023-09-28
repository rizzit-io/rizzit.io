import * as esbuild from 'esbuild'

const build = async () => {
  const publicContext = await esbuild.context({
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
  })

  const srcContext = await esbuild.context({
    entryPoints: [
      'src/index.ts'
    ],
    bundle: true,
    outfile: 'build/bundle.js',
    minify: true
  })

  return {
    publicContext,
    srcContext
  }
}

export default build
