<template>
  <div class="input-autocomplete">
    <input class="input"
      @keydown.down.prevent  ="onDown()"
      @keydown.up.prevent    ="onUp()"
      @keydown.enter.prevent ="onEnter()"
      @keydown.esc.prevent   ="onEsc()"
      @input                 ="onInputSet($event.target.value)"
      :value                 ="filter"

    >
    <div class="items" v-show="showList">
      <list-selection 
        :Items="filtered"
        Property="name"
        :VisibleItems='VisibleItems'
        ref="thisSelection"
        @clicked="value => onClicked(value)"
      ></list-selection>
    </div>
  </div>
</template>

<script>
import ListSelection from '@/components/list-selection'

export default {
  name: 'input-autocomplete',
  components: {
    ListSelection
  },
  props: {
    Items: {
      type: Array,
      default: () => []
    },
    Property: {
      type: String,
      required: true
    },
    VisibleItems: {
      type: Number,
      default: 10,
      validator: function (value) {
        return value >= 1;
      }      
    }
  },
  computed: {
    filtered: function() {
      return this.Items.filter(item => item.name.toUpperCase().includes(this.filter.toUpperCase()));
    }
  },
  methods: {
    onDown: function() {
      this.showList = true;
      this.$refs.thisSelection.onDown();
    },
    onUp: function() {
      this.$refs.thisSelection.onUp();
    },
    onEnter: function() {
      this.$refs.thisSelection.onClick();
    },
    onEsc: function() {
      this.showList = false;
    },
    onInputSet: function(value) {
      this.filter   = value;
      this.showList = value !== '' && this.filtered.length > 0;
    },
    onClicked: function(value) {
      this.showList = false;
      this.filter   = value[this.Property];
    }
  },
  mounted() {
    /* Hack
      In list-selection "getBoundingClientRect" is used to determine
      the height of one element, which could only be obtained, if the
      element is displayed.
    */
    this.showList = false;

  },
  data() {
    return {
      filter:   '',
      showList: true
    }
  }
}
</script>

<style lang="less" scoped>

.input-autocomplete {

  position: relative;
  display:  inline-block;

  .items {
    background-color: white;
    position:      absolute;
    z-index:       99;
    left:          0;
    right:         0;
  }
}

</style>

