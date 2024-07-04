import { defineConfig,loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { mockServe } from "./src/plugin/mockServe";

// https://vitejs.dev/config/
export default defineConfig(({ command,mode }) => {
   // 获取.env文件里定义的环境变量
  const env = loadEnv(mode, process.cwd());
  console.log("mode",mode);   //变量在命令行里打印出来
  console.log(env);   //变量在命令行里打印出来
  //.env文件中的环境变量必须以VITE_为前缀，否则无法引用成功
  const   {VITE_APP_ENV} = env
  return {
    build: {
      reportCompressedSize: false, // 禁用 压缩大小报告,以提高大型项目的构建性能。
      // https://www.zhihu.com/question/518443897/answer/2397938046
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        com: path.resolve(__dirname, "/src/components"),
        assets: "/src/assets",
      },
    },
    //本地运行配置，以及反向代理配置,项目部署到nginx服务器上之后，不会再走这里，这里知识本地请求的时候再会调用
    server: {
      port: "8080",//端口
      // host: "localhost",//ip地址例如192.168.1.177
      host:true,
      open: true,//服务启动时自动在浏览器中打开应用
      // 反向代理配置
      proxy: { //配置多个代理
        '/user': {
        target: "http://localhost:8000/",//例子:http://192.168.1.177:8080 或测试服务器https://xxxx.com
        changeOrigin: true,///设置访问目标地址允许跨域
        }
        ,
        '/merchant': {
        target: "http://localhost:8000/",
        changeOrigin: true,///设置访问目标地址允许跨域
        // rewrite: (p) => p.replace(/^\/merchant/, '')
        },
        '/commodity': {
        target: "http://localhost:8000/",
        changeOrigin: true,///设置访问目标地址允许跨域
        // rewrite: (p) => p.replace(/^\/commodity/, '')
        },
        '/order': {
          target: "http://localhost:8000/",
          changeOrigin: true,///设置访问目标地址允许跨域
          // rewrite: (p) => p.replace(/^\/order/, '')
        },
        '/pay': {
          target: "http://localhost:8000/",
          changeOrigin: true,///设置访问目标地址允许跨域
          // rewrite: (p) => p.replace(/^\/pay/, '')
        }
      }
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "/src/styles/_variables";
          `,
        },
      },

      // postcss: {
      //   plugins: [
      //     {
      //       postcssPlugin: 'internal:charset-removal',
      //       AtRule: {
      //         // 去除 warning: "@charset" must be the first rule in the file
      //         charset: (atRule) => atRule.name === 'charset' && atRule.remove(),
      //       },
      //     },
      //   ],
      // },
    },
    plugins: [vue(), mockServe(command)],
  };
});
