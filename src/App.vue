<template>
  <div id="app">
    <!-- <list-selection :Items="samples" Property="name" :VisibleItems='5' :isSelectable="true"  @selected="that => this.selectedSample = that"></list-selection>
    <p>{{ selectedSample.name }}</p> -->
    <!-- <hr>
    <input-autocomplete :Items="samples" Property="name" :VisibleItems='10'></input-autocomplete> -->
    <!-- <spike-component :value="spikeValue" @input="that => this.spikeValue = that"></spike-component>
    <div>{{ spikeValue.name }}</div>
    <hr> -->
    
    <input-autocomplete
      :Items="samples"
      Property="name"
      :VisibleItems='10'
      @input="that => this.inputSample = that"
    ></input-autocomplete>
    <span> {{ inputSample.name }}</span>

    <hr>
  </div>
</template>

<script>
/* eslint-disable */
import 'normalize.css'

import SpikeComponent    from '@/components/spike-component'
import ListSelection     from '@/components/list-selection'
import InputAutocomplete from '@/components/input-autocomplete'

import SampleData from '@/assets/sample-data.json'

export default {
  name: 'app',
  components: {
    ListSelection,
    InputAutocomplete,
    SpikeComponent
  },
  data() {
    return {
      selectedSample: { name: '-' },
      samples: SampleData,
      spikeValue: { name: '-' },
      inputSample: { name: '-' }
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

  .input-autocomplete {

    .items {
      box-shadow: 5px 10px 8px #888888;
    }
  }
}
</style>
