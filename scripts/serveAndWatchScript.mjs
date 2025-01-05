import * as esbuild from 'esbuild'
import publicBuildOptions from './publicBuildOptions.mjs'
import srcBuildOptions from './srcBuildOptions.mjs'

const publicContext = await esbuild.context(publicBuildOptions)

const srcContext = await esbuild.context(srcBuildOptions)

void publicContext.watch()
void srcContext.watch()

void srcContext.serve({
    servedir: 'build'
})
