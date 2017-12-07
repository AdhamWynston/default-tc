<template>
  <ul class="breadcrumb">
    <li v-for="item in items">
      <a>
        <i>{{ item.icon }}</i> {{ item.label }}
      </a>
    </li>
  </ul>
</template>
<script>
  export default {
    data: () => {
      return {
        items: [
          { icon: 'home', label: 'Painel' }
        ]
      }
    }
  }
</script>
