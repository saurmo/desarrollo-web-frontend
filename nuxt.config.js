import VuetifyLoaderPlugin from "vuetify-loader/lib/plugin";

export default {
  //   buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Build configuration
   */
  build: {
    transpile: ["vuetify/lib"],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~/assets/style/variables.styl"],
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  plugins: [{ src: "@/plugins/vuetify" }],
  //   css: ["~/assets/style/app.styl"],
};
