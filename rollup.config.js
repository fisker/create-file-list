import {terser} from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'

const input = 'src/index.mjs'
const name = 'createFileList'
const filename = 'create-file-list'
const umdBuild = {
  input,
  output: {
    file: `dist/${filename}.js`,
    format: 'umd',
    name,
  },
  plugins: [babel()],
}

const esmBuild = {
  input,
  output: {
    file: `dist/${filename}.mjs`,
    format: 'esm',
  },
  plugins: [
    // do we need babel ?
    babel({babelHelpers: 'bundled'}),
  ],
}

function minify(bundle) {
  let {input, output, plugins} = bundle
  output = {
    ...output,
    file: output.file.replace(/\.(m?js)$/, '.min.$1'),
  }
  plugins = [...plugins, terser()]
  return {
    input,
    output,
    plugins,
  }
}

const builds = [umdBuild, esmBuild]

export default [...builds, ...builds.map((bundle) => minify(bundle))]
