<template>
  <div id="app">
    <input-autocomplete
      :Items="samples"
      Property="name"
      :VisibleItems='10'
      @input="that => this.inputSample = that"
      :value="inputSample"
    ></input-autocomplete>
    <span> {{ inputSample.name }}</span>
    <hr>
  </div>
</template>

<script>
import 'normalize.css'

import InputAutocomplete from '@/components/input-autocomplete'

import SampleData from '@/assets/sample-data.json'

export default {
  name: 'app',
  components: {
    InputAutocomplete
  },
  data() {
    return {
      samples: SampleData,
      inputSample: { name: 'Sample' }
    }
  }
}
</script>

<style lang="less">

body {

  font-family: Arial, Helvetica, sans-serif;
  padding: 2rem;


  .input-autocomplete {

    .list-selection {

      box-shadow: 5px 10px 8px #888888;

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
}
</style>
