// dotenv: https://qiita.com/xrxoxcxox/items/4e337b96fc9017b3771c
require( "dotenv" ).config()

module.exports = {
  pathPrefix: "/microcms-gatsby",  // FYI: https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/how-gatsby-works-with-github-pages/
  siteMetadata: {
    title: `インターネット老人おぢさん`,
    description: `元CEO現役フリーランスエンジニア兼講師兼Youtuber「のむらやごろう」です。プログラミングの楽しさと副業・転職の話をスクール、スカウト、採用の3つの目線で解説します。STEM教育（水耕栽培など家庭農業IoT）とイクメン活動に奔走中`,
    author: `のむらやごろう`,
    siteUrl: `https://speedtest-netlify.netlify.app`,  // gatsby-plugin-canonical-urlsで使っているのでこちらに寄せる
    twitterUsername: `elder_uncle`,
    lang: `ja`,
    image: `src/images/favicon.png`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-source-microcms", // FYI: https://qiita.com/akifumiyoshimu/items/ecb07219185c43cecfec
      options: {
        apiKey: process.env.GATSBY_API_KEY, // dotenv
        serviceId: process.env.GATSBY_SERVICE_ID, // dotenv
        apis: [ {
          endpoint: "main",
          query: {
            limit: 100,
          },
        } ],
      },
    },
    {
      resolve: '@mako-tos/gatsby-transformer-for-microcms',  // FYI: https://qiita.com/mako-tos/items/aa2cf761fc082d32ac71
      options: {
        mediaType: 'MicrocmsMain', // 必須 string 型
        field: 'body', // 必須 string 型
        useHljs: true, // 任意 boolean 型
        image: {
          sizes: '80vw', // 任意 string 型
        },
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,  // FYI: https://webcraftlog.net/best-gatsbyjs-plugins/
      options: {
        alias: {
          "@src": "src",
          "@components": "src/components",
          "@layouts": "src/layouts",
          "@pages": "src/pages",
          "@images": "src/images",
          "@templates": "src/templates",
          "@fonts": "src/fonts",  // FYI: https://github.com/KyleAMathews/typefaces/tree/master/packages
        },
        extensions: [ "js", "jsx", "ts", "tsx" ],
      }
    },
    `gatsby-plugin-image`, // FYI: https://ebisu.com/note/new-gatsby-image/
    `gatsby-plugin-emotion`,  // FYI: https://www.gatsbyjs.com/plugins/gatsby-plugin-emotion/
    `gatsby-plugin-netlify-cache`,  // FYI: https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify-cache/
    {
      resolve: `gatsby-plugin-canonical-urls`, // FYI: https://qiita.com/atomyah/items/69028992eacf28d92957
      options: {
        siteUrl: `https://nomuraya-diary.netlify.app`,
        stripQueryString: true,
      },
    },
    `gatsby-plugin-sitemap`,  // FYI: https://qiita.com/atomyah/items/69028992eacf28d92957
    {
      resolve: 'gatsby-plugin-robots-txt', // FYI: https://qiita.com/atomyah/items/69028992eacf28d92957
      options: {
        host: 'https://nomuraya-diary.netlify.app',
        sitemap: 'https://nomuraya-diary.netlify.app/sitemap.xml',
        policy: [ { userAgent: '*', allow: '/' } ]
      }
    },
    `gatsby-plugin-offline`,  // FYI: https://webcraftlog.net/gatsby-seo-settings/
    {
      resolve: `gatsby-plugin-manifest`, // FYI: https://webcraftlog.net/gatsby-seo-settings/
      options: {
        name: "インターネット老人おじさん",
        short_name: "ネット老人おぢ",
        theme_color: "#2196f3",
        background_color: "#2196f3",
        start_url: "/",
        display: `standalone`,
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`, // FYI: https://webcraftlog.net/best-gatsbyjs-plugins/
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: false,
        minimum: 0.08,
        easing: 'linear',
        positionUsing: '',
        speed: 200,
        trickle: true,
        trickleSpeed: 200,
        barSelector: '[role="bar"]',
        spinnerSelector: '[role="spinner"]',
        parent: 'body',
        template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
      },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,  // FYI: https://takumon.com/2018/10/07/
      options: {
        publisherId: process.env.GATSBY_ADSENSE, // dotenv
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,  // FYI: https://blog.ojisan.io/gatsby-meet-netlify
      options: {
        headers: {
          "/*.html": [ "Cache-Control: public, max-age=0, must-revalidate" ],
          "/sw.js": [ "Cache-Control: no-cache" ],
          "/**/*.js": [ "Cache-Control: public, max-age=31536000, immutable" ],
          "/**/*.css": [ "Cache-Control: public, max-age=31536000, immutable" ],
        },
      },
    },
  ],
}
