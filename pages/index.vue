<template>
  <section>
    <h1>記事一覧</h1>
    <article>
      <ul>
        <li v-for="content in contents" :key="content.id">
          <nuxt-link :to="`/${content.id}`">
            {{ content.title }}
          </nuxt-link>
        </li>
      </ul>
    </article>
    <h1>ページング</h1>
    <nav class="paginate">
      <ul>
        <li v-for="page in pages">
          <nuxt-link :to="`/page/${page.url}`">{{page.value}}</nuxt-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  // サイトの情報を作成する
  async asyncData( params ) {
    // console.log(params);
    const page = Number(params.params.p || '1')
    const limit = 1

    const { data } = await axios.get(
      `${params.$config.url}?limit=${limit}&offset=${(page - 1) * limit}`,
      {
        headers: { 'X-API-KEY': params.$config.apiKey }
      }
    );

    /**
     * ページネーション
     * 本当はvue-paginateとかvuejs-paginateとかVuetify使いたいけど、挙動不明のエラー？に阻まれしゃーなしに作成
     */
    function paginate( page, limit, total )
    {
      const add = ( page, text ) => result.push( { url: page, value: text } );
      const last = Math.ceil( total / limit );
      const margin = 2;
      const result = [];
      var prev = false;
      var next = false;

      for ( var i = ( page - margin ); i <= ( page + margin ); i++ )
      {
        if ( i < 1 || i == page || last < i ) continue

        add( i, i )
        if ( i < page ) prev = true
        if ( i > page ) next = true;
      }
      if ( prev ) result.unshift( { page: 1, text: "Prev" } )
      if ( result.length > 0 && (result[ 0 ].page + 1 < result[ 1 ].page) ) result.splice( 1, 0, { page: "#", text: "..." } )

      if ( next ) add( last, "Next" )
      if ( result.length > 0 && result[ result.length - 2 ].page + 1 < result[ result.length - 1 ].page ) result.splice( result.length - 1, 0, { page: "#", text: "..." } )
      return result;
    }

    return {
      ...data,
      pages: paginate(page, limit, data.totalCount),
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./css/style.css"
</style>
