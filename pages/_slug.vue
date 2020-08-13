<template>
  <main class="main">
    <h1 class="title">{{ title }}</h1>
    <p class="publishedAt">{{ publishedAt }}</p>
    <p class="tag">{{ tag && tag.name }}</p>
    <ul class="lists">
      <li :class="`list ${item.name}`" v-for="item in toc" :key="item.id">
        <n-link v-scroll-to="`#${item.id}`" to>
          {{ item.text }}
        </n-link>
      </li>
    </ul>
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
  async asyncData(params) {
    // console.log(params);  // ページにアクセスするとデバッグできる
    try {
      const { data } = await axios.get(
        `${params.$config.url}/${params.params.slug}`,
        {
          headers: { 'X-API-KEY': params.$config.apiKey }
        }
      )

      data.publishedAt = moment(data.publishedAt).format("YYYY月M月D日")
      data.body = marked(data.body);
      const $ = cheerio.load(data.body);

      // ハイライト
      $('pre code').each((_, elm) => {
        const result = hljs.highlightAuto($(elm).text());
        $(elm).html(result.value);
        $(elm).addClass('hljs');
      });

      // 目次
      const headings = $('h1, h2, h3').toArray();
      const toc = headings.map(contents => ({
        text: contents.children[0].data,
        id: contents.attribs.id,
        name: contents.name
      }));

      return {
        ...data,
        body: $.html(),
        toc: (data.toc) ? toc : [],
      };
    } catch (err) {
      error({
        statusCode: err.response.status,
        message: err.response.data.message,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./css/style.css"
</style>
