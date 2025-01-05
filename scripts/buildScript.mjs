import * as esbuild from 'esbuild'
import publicBuildOptions from './publicBuildOptions.mjs'
import srcBuildOptions from './srcBuildOptions.js'

await esbuild.build(publicBuildOptions)

await esbuild.build(srcBuildOptions)

