import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills"

/**按需导入组件库  查看=>https://zhuanlan.zhihu.com/p/423194571 */
import Components from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"

export default defineConfig({
  base: "./", // * 打包相对路径,否则electron加载index.html时找不到css,js文件
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
    }),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src") // 路径别名
    }
  },
  server: {
    strictPort: true, // * 固定端口(如果端口被占用则中止)
    host: true, // 0.0.0.0
    port: 8875
  },
  build: {
    outDir: "output/dist" // 打包输出文件路径
  }
});
