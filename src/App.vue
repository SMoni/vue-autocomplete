<template>
  <div id="app">
    <input  
      @keydown.down.prevent ="$refs.thisSelection.onDown()"
      @keydown.up.prevent   ="$refs.thisSelection.onUp()"
      :value="selectedSample01.name"
    >
    <list-selection :Items="samples" Property="name" :VisibleItems='10' @selected="that => this.selectedSample01 = that" ref="thisSelection"></list-selection>
    
    <hr>

    <p>{{ selectedSample02.name }}</p>
    <list-selection :Items="samples" Property="name" :VisibleItems='12' :isSelectable="true"  @selected="that => this.selectedSample02 = that"></list-selection>
  </div>
</template>

<script>
import 'normalize.css'

import ListSelection from '@/components/list-selection'

import SampleData from '@/assets/sample-data.json'

export default {
  name: 'app',
  components: {
    ListSelection
  },
  data() {
    return {
      selectedSample01: { name: '-' },
      selectedSample02: { name: '-' },
      samples: SampleData
    }
  }
}
</script>

<style lang="less">

body {
  font-family: Arial, Helvetica, sans-serif;
  padding: 2rem;

  .list-selection {

    .item {
      border: 1px solid transparent;
      border-bottom: 1px solid #d4d4d4;
      padding: .2rem;

      &:hover {
        background-color: black;
        color: white;
      }

      &.active {
        background-color: DodgerBlue !important; 
        color: #ffffff; 
      }
    }
  }
}
</style>
