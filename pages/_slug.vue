<template>
  <main class="main">
    <h1 class="title">{{ title }}</h1>
    <ul class="tag">
      <li v-for="tag in tags">{{ tag }}</li>
    </ul>
    <p class="publishedAt">{{ publishedAt }}</p>
    <nav>
      <h1>目次</h1>
      <ul class="lists">
        <li :class="`list ${item.name}`" v-for="item in toc" :key="item.id">
          <n-link v-scroll-to="`#${item.id}`" to>
            {{ item.text }}
          </n-link>
        </li>
      </ul>
    </nav>
    <div class="post" v-html="body"></div>
  </main>
</template>


<script>
  import axios from 'axios'
  import marked from 'marked'
  import cheerio from 'cheerio';
  import hljs from 'highlight.js'
  import moment from 'moment'
  import 'highlight.js/styles/hybrid.css';

  export default {
    async asyncData( params )
    {
      // console.log(params);  // ページにアクセスするとデバッグできる

      // microCMSの下書きを画面プレビューで見れるように変更
      let draftKey = "";
      if ( params.hasOwnProperty( 'ssrContext' ) )
      {
        if ( params.ssrContext.hasOwnProperty( 'req' ) )
        {
          draftKey = params.ssrContext.req.url.split( "?" );
          draftKey = ( draftKey.length > 1 )
            ? `?${draftKey[ 1 ]}`
            : "";
        }
      }
      try
      {
        const { data } = await axios.get(
          `${params.$config.url}/${params.params.slug}${draftKey}`,
          {
            headers: { 'X-API-KEY': params.$config.apiKey }
          }
        )

        data.publishedAt = moment( data.publishedAt ).format( "YYYY月M月D日" )
        data.body = marked( data.body );
        const $ = cheerio.load( data.body );

        // ハイライト
        $( 'pre code' ).each( ( _, elm ) =>
        {
          const result = hljs.highlightAuto( $( elm ).text() );
          $( elm ).html( result.value );
          $( elm ).addClass( 'hljs' );
        } );

        // 目次
        const headings = $( 'h1, h2, h3' ).toArray();
        const toc = headings.map( contents => ( {
          text: contents.children[ 0 ].data,
          id: contents.attribs.id,
          name: contents.name
        } ) );

        return {
          ...data,
          body: $.html(),
          toc: ( data.toc ) ? toc : [],
        };
      } catch ( err )
      {
        error( {
          statusCode: err.response.status,
          message: err.response.data.message,
        } );
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    width: 960px;
    margin: 0 auto;
  }

  .title {
    margin-bottom: 20px;
  }

  .publishedAt {
    margin-bottom: 40px;
  }

  .post {
    &>h1 {
      font-size: 30px;
      font-weight: bold;
      margin: 40px 0 20px;
      background-color: #eee;
      padding: 10px 20px;
      border-radius: 5px;
    }

    &>h2 {
      font-size: 24px;
      font-weight: bold;
      margin: 40px 0 16px;
      border-bottom: 1px solid #ddd;
    }

    &>p {
      line-height: 1.8;
      letter-spacing: 0.2px;
    }

    &>ol {
      list-style-type: decimal;
      list-style-position: inside;
    }
  }

  .paginate ul li {
    list-style-type: none;
    float: left;
    border: 1px solid blue;
    margin-right: 10px;
    padding: 10px;
  }

</style>
