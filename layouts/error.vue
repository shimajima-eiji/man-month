<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <h1>エラーが発生しました</h1>
  </div>
</template>

<script>
export default {
  props: {
    error: { type: Object, default () { return {} } }
  }
}
</script>
