<template>
  <div id="app">
    <input-autocomplete
      :items       ="normalSamples"
      :value       ="normalInput"
      property     ="name"
      :visibleItems="8"
      @input       ="that => this.normalInput = that"
      placeholder  ="Start typing"
    ></input-autocomplete>
    <span>{{ normalInput.name }}</span>
    <hr>
    <input-autocomplete
      :items       ="hugeSamples"
      :value       ="hugeInput"
      property     ="name"
      :visibleItems="20"
      @input       ="that => this.hugeInput = that"
      placeholder  ="Start typing"
    ></input-autocomplete>
    <span>{{ hugeInput.name }}</span>
    <hr>
    <div class="text">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget sit amet tellus cras adipiscing enim. Tempus imperdiet nulla malesuada pellentesque elit eget. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Odio morbi quis commodo odio. Suspendisse ultrices gravida dictum fusce. Velit sed ullamcorper morbi tincidunt ornare massa. Sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. A cras semper auctor neque. Varius quam quisque id diam vel quam elementum pulvinar etiam. Adipiscing bibendum est ultricies integer. Et tortor at risus viverra adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Purus sit amet luctus venenatis lectus. Dignissim diam quis enim lobortis scelerisque fermentum dui.</p>
      <p>Risus quis varius quam quisque id diam vel. Tincidunt augue interdum velit euismod in. Sagittis purus sit amet volutpat consequat mauris nunc congue. Venenatis urna cursus eget nunc scelerisque viverra mauris. Varius morbi enim nunc faucibus a. Varius sit amet mattis vulputate enim nulla aliquet. Vitae auctor eu augue ut lectus arcu bibendum. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Etiam dignissim diam quis enim. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus. Nisl pretium fusce id velit ut. Nulla aliquet enim tortor at auctor urna nunc id cursus.</p>
      <p>Ut faucibus pulvinar elementum integer enim neque volutpat. Non nisi est sit amet facilisis magna etiam. Sit amet porttitor eget dolor morbi non arcu risus quis. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Imperdiet massa tincidunt nunc pulvinar sapien et. Egestas sed tempus urna et pharetra pharetra massa massa. Feugiat vivamus at augue eget. Velit sed ullamcorper morbi tincidunt ornare. Quisque non tellus orci ac. Odio morbi quis commodo odio aenean sed. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Non sodales neque sodales ut etiam sit amet nisl.</p>
      <p>Nulla facilisi etiam dignissim diam. Integer eget aliquet nibh praesent tristique magna sit amet. Elit scelerisque mauris pellentesque pulvinar pellentesque. Enim sit amet venenatis urna cursus eget nunc. Enim sed faucibus turpis in eu mi bibendum neque. Quisque id diam vel quam. Sit amet consectetur adipiscing elit. Tristique risus nec feugiat in fermentum posuere urna nec tincidunt. Pharetra magna ac placerat vestibulum lectus mauris ultrices. Nisl nisi scelerisque eu ultrices vitae. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Leo integer malesuada nunc vel risus. Pretium nibh ipsum consequat nisl. Arcu dui vivamus arcu felis bibendum ut tristique. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Elit at imperdiet dui accumsan. Posuere ac ut consequat semper. Enim lobortis scelerisque fermentum dui faucibus in ornare. Quis auctor elit sed vulputate mi sit amet mauris commodo. Tellus in metus vulputate eu scelerisque felis.</p>
      <p>Netus et malesuada fames ac turpis egestas integer eget. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pharetra diam sit amet nisl suscipit adipiscing bibendum est. Viverra vitae congue eu consequat ac. In fermentum posuere urna nec tincidunt. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. At elementum eu facilisis sed odio morbi. Sed turpis tincidunt id aliquet risus. Vitae et leo duis ut diam quam nulla. Nulla facilisi etiam dignissim diam quis enim. Purus non enim praesent elementum facilisis leo vel fringilla. Diam sit amet nisl suscipit adipiscing. A arcu cursus vitae congue mauris rhoncus aenean. Sed augue lacus viverra vitae congue. Ultrices vitae auctor eu augue ut. Ipsum a arcu cursus vitae congue mauris rhoncus aenean.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget sit amet tellus cras adipiscing enim. Tempus imperdiet nulla malesuada pellentesque elit eget. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Odio morbi quis commodo odio. Suspendisse ultrices gravida dictum fusce. Velit sed ullamcorper morbi tincidunt ornare massa. Sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. A cras semper auctor neque. Varius quam quisque id diam vel quam elementum pulvinar etiam. Adipiscing bibendum est ultricies integer. Et tortor at risus viverra adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Purus sit amet luctus venenatis lectus. Dignissim diam quis enim lobortis scelerisque fermentum dui.</p>
      <p>Risus quis varius quam quisque id diam vel. Tincidunt augue interdum velit euismod in. Sagittis purus sit amet volutpat consequat mauris nunc congue. Venenatis urna cursus eget nunc scelerisque viverra mauris. Varius morbi enim nunc faucibus a. Varius sit amet mattis vulputate enim nulla aliquet. Vitae auctor eu augue ut lectus arcu bibendum. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Etiam dignissim diam quis enim. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus. Nisl pretium fusce id velit ut. Nulla aliquet enim tortor at auctor urna nunc id cursus.</p>
      <p>Ut faucibus pulvinar elementum integer enim neque volutpat. Non nisi est sit amet facilisis magna etiam. Sit amet porttitor eget dolor morbi non arcu risus quis. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Imperdiet massa tincidunt nunc pulvinar sapien et. Egestas sed tempus urna et pharetra pharetra massa massa. Feugiat vivamus at augue eget. Velit sed ullamcorper morbi tincidunt ornare. Quisque non tellus orci ac. Odio morbi quis commodo odio aenean sed. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Non sodales neque sodales ut etiam sit amet nisl.</p>
      <p>Nulla facilisi etiam dignissim diam. Integer eget aliquet nibh praesent tristique magna sit amet. Elit scelerisque mauris pellentesque pulvinar pellentesque. Enim sit amet venenatis urna cursus eget nunc. Enim sed faucibus turpis in eu mi bibendum neque. Quisque id diam vel quam. Sit amet consectetur adipiscing elit. Tristique risus nec feugiat in fermentum posuere urna nec tincidunt. Pharetra magna ac placerat vestibulum lectus mauris ultrices. Nisl nisi scelerisque eu ultrices vitae. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Leo integer malesuada nunc vel risus. Pretium nibh ipsum consequat nisl. Arcu dui vivamus arcu felis bibendum ut tristique. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Elit at imperdiet dui accumsan. Posuere ac ut consequat semper. Enim lobortis scelerisque fermentum dui faucibus in ornare. Quis auctor elit sed vulputate mi sit amet mauris commodo. Tellus in metus vulputate eu scelerisque felis.</p>
      <p>Netus et malesuada fames ac turpis egestas integer eget. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pharetra diam sit amet nisl suscipit adipiscing bibendum est. Viverra vitae congue eu consequat ac. In fermentum posuere urna nec tincidunt. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. At elementum eu facilisis sed odio morbi. Sed turpis tincidunt id aliquet risus. Vitae et leo duis ut diam quam nulla. Nulla facilisi etiam dignissim diam quis enim. Purus non enim praesent elementum facilisis leo vel fringilla. Diam sit amet nisl suscipit adipiscing. A arcu cursus vitae congue mauris rhoncus aenean. Sed augue lacus viverra vitae congue. Ultrices vitae auctor eu augue ut. Ipsum a arcu cursus vitae congue mauris rhoncus aenean.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget sit amet tellus cras adipiscing enim. Tempus imperdiet nulla malesuada pellentesque elit eget. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Odio morbi quis commodo odio. Suspendisse ultrices gravida dictum fusce. Velit sed ullamcorper morbi tincidunt ornare massa. Sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. A cras semper auctor neque. Varius quam quisque id diam vel quam elementum pulvinar etiam. Adipiscing bibendum est ultricies integer. Et tortor at risus viverra adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Purus sit amet luctus venenatis lectus. Dignissim diam quis enim lobortis scelerisque fermentum dui.</p>
      <p>Risus quis varius quam quisque id diam vel. Tincidunt augue interdum velit euismod in. Sagittis purus sit amet volutpat consequat mauris nunc congue. Venenatis urna cursus eget nunc scelerisque viverra mauris. Varius morbi enim nunc faucibus a. Varius sit amet mattis vulputate enim nulla aliquet. Vitae auctor eu augue ut lectus arcu bibendum. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Etiam dignissim diam quis enim. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus. Nisl pretium fusce id velit ut. Nulla aliquet enim tortor at auctor urna nunc id cursus.</p>
      <p>Ut faucibus pulvinar elementum integer enim neque volutpat. Non nisi est sit amet facilisis magna etiam. Sit amet porttitor eget dolor morbi non arcu risus quis. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Imperdiet massa tincidunt nunc pulvinar sapien et. Egestas sed tempus urna et pharetra pharetra massa massa. Feugiat vivamus at augue eget. Velit sed ullamcorper morbi tincidunt ornare. Quisque non tellus orci ac. Odio morbi quis commodo odio aenean sed. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Non sodales neque sodales ut etiam sit amet nisl.</p>
      <p>Nulla facilisi etiam dignissim diam. Integer eget aliquet nibh praesent tristique magna sit amet. Elit scelerisque mauris pellentesque pulvinar pellentesque. Enim sit amet venenatis urna cursus eget nunc. Enim sed faucibus turpis in eu mi bibendum neque. Quisque id diam vel quam. Sit amet consectetur adipiscing elit. Tristique risus nec feugiat in fermentum posuere urna nec tincidunt. Pharetra magna ac placerat vestibulum lectus mauris ultrices. Nisl nisi scelerisque eu ultrices vitae. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Leo integer malesuada nunc vel risus. Pretium nibh ipsum consequat nisl. Arcu dui vivamus arcu felis bibendum ut tristique. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Elit at imperdiet dui accumsan. Posuere ac ut consequat semper. Enim lobortis scelerisque fermentum dui faucibus in ornare. Quis auctor elit sed vulputate mi sit amet mauris commodo. Tellus in metus vulputate eu scelerisque felis.</p>
      <p>Netus et malesuada fames ac turpis egestas integer eget. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pharetra diam sit amet nisl suscipit adipiscing bibendum est. Viverra vitae congue eu consequat ac. In fermentum posuere urna nec tincidunt. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. At elementum eu facilisis sed odio morbi. Sed turpis tincidunt id aliquet risus. Vitae et leo duis ut diam quam nulla. Nulla facilisi etiam dignissim diam quis enim. Purus non enim praesent elementum facilisis leo vel fringilla. Diam sit amet nisl suscipit adipiscing. A arcu cursus vitae congue mauris rhoncus aenean. Sed augue lacus viverra vitae congue. Ultrices vitae auctor eu augue ut. Ipsum a arcu cursus vitae congue mauris rhoncus aenean.</p>
    </div>
    <hr>
    <input-autocomplete
      :items       ="bottomSamples"
      :value       ="bottomInput"
      property     ="name"
      :visibleItems="8"
      @input       ="that => this.bottomInput = that"
      placeholder  ="Start typing"
    ></input-autocomplete>
    <span>{{ bottomInput.name }}</span>
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
      hugeInput:     { name: '' },
      bottomSamples: SampleData,
      bottomInput:   { name: '' },
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

        height: 1.3rem;
        border: 1px solid transparent;

        &:hover {
          background-color: black;
          color:            white;
        }

        &.active {
          border-top:    1px dashed gray;
          border-bottom: 1px dashed gray;
        }
      }
    }
  }

  .text {
    width: 50%;
  }
}
</style>
