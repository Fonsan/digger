// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';


export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/digger.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [typescript(), nodeResolve(), commonjs()],
};
