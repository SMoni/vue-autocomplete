<template>
  <div id="app">
    <input-autocomplete
      :Items       ="normalSamples"
      :value       ="normalInput"  
      Property     ="name"
      :VisibleItems="8"
      @input       ="that => this.normalInput = that"
      Placeholder  ="Start typing"
    ></input-autocomplete>
    <span>{{ normalInput.name }}</span>
    <hr>
    <input-autocomplete
      :Items       ="hugeSamples"
      :value       ="hugeInput"  
      Property     ="name"
      :VisibleItems="8"
      @input       ="that => this.hugeInput = that"
      Placeholder  ="Start typing"
    ></input-autocomplete>
    <span>{{ hugeInput.name }}</span>    
  </div>
</template>

<script>
import InputAutocomplete from '@/components/input-autocomplete'
import SampleData        from '@/assets/sample-data.json'
import HugeSampleData    from '@/assets/huge-sample-data.json'

import 'normalize.css'

export default {
  name: 'app',
  components: {
    InputAutocomplete
  },
  data() {
    return {
      normalSamples: SampleData,
      normalInput:   { name: '' },
      hugeSamples:   HugeSampleData,
      hugeInput:     { name: '' }
    }
  }
}
</script>

<style lang="less">

body {

  font-family: Arial, Helvetica, sans-serif;
  padding:     2rem;

  span {
    padding-left: 1rem;
  }

  .input-autocomplete {

    .input {
      width: 30rem;
    }

    .list-selection {

        box-shadow: 5px 10px 8px #888888;

        .item {
        border:        1px solid transparent;
        border-bottom: 1px solid #d4d4d4;
        padding:       .2rem;

        &:hover {
            background-color: black;
            color:            white;
        }

        &.active {
            background-color: DodgerBlue; 
            color:            #ffffff; 
        }
      }
    }
  }
}
</style>
