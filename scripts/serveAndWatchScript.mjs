import build from './build.mjs'

const {
    publicContext,
    srcContext
} = await build()

void publicContext.watch()
void srcContext.watch()

void srcContext.serve({
    servedir: 'build'
})
