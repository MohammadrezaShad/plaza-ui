/* eslint-disable @typescript-eslint/no-var-requires */
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import {terser} from 'rollup-plugin-terser';
import {visualizer} from 'rollup-plugin-visualizer';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';

import pkg from './package.json';
// import {getFiles} from './scripts/buildUtils';

const styledComponentsTransformer = createStyledComponentsTransformer();

// const extensions = ['.js', '.ts', '.jsx', '.tsx', '.css'];

const externals = {
  react: 'React',
  'styled-components': 'styled-components',
  'babel-runtime': '/@babel/runtime/',
};

const babelConfig = {
  exclude: 'node_modules/**',
  plugins: ['@babel/transform-runtime'],
  babelHelpers: 'runtime',
};

const jsonConfig = {
  compact: true,
};

const urlConfig = {
  include: ['**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp'],
};

const typescriptConfig = {
  tsconfig: './tsconfig.build.json',
  declaration: true,
  declarationDir: 'lib',
  transformers: [
    () => ({
      before: [styledComponentsTransformer],
    }),
  ],
};

const visualizerConfig = {
  filename: 'visualizer/bundle-analysis.html',
  open: true,
};

export default {
  input: ['./src/index.ts'],
  external: {
    ...Object.keys(externals),
    ...Object.keys(pkg.peerDependencies || {}),
  },
  output: {
    dir: 'lib',
    format: 'cjs',
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: true,
    exports: 'named',
  },
  plugins: [
    resolve(),
    postcss(),
    babel(babelConfig),
    json(jsonConfig),
    peerDepsExternal(),
    commonjs(),
    svgr(),
    url(urlConfig),
    typescript(typescriptConfig),
    terser(),
    visualizer(visualizerConfig),
  ],
};
