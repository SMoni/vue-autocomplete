<template>
  <div class="input-autocomplete">
    <input class="input"
      @keydown.down.prevent ="onDown()"
      @keydown.up.prevent   ="onUp()"
      @keydown.enter.prevent="onEnter()"
      @keydown.esc.prevent  ="closeList()"
      @input                ="onInput($event.target.value)"
      :value                ="filter"
    >
    <list-selection v-show="showList"
      :Items="filtered"
      :Property="Property"
      :VisibleItems='VisibleItems'
      ref="list"
      @selected="onSelected"
    ></list-selection>
  </div>
</template>

<script>
/* eslint-disable */
import ListSelection from '@/components/list-selection'
import { createPlaceholderWith } from '@/components/utilities'

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

      if(this.showList) {
        this.$refs.list.onDown();
      }

      this.showList = true;
    },
    onUp: function() {
      this.$refs.list.onUp();
    },
    onEnter: function() {

      if(this.filter === '' && !this.showList) {
        this.onSelected();
      } else {
        this.$refs.list.onClick();
      }
    },
    closeList: function() {
      this.showList = false;
    },
    onInput: function(value) {
      this.filter = value;

      this.onSelected();

      this.showList = value !== '' && this.filtered.length > 0;
    },
    onSelected: function(value) {

      this.showList = false;

      if(value) {
        this.filter = value[this.Property];
        this.$emit('input', value);
      } else {
        this.$emit('input', 
          createPlaceholderWith(this.Property, this.filter)
        );
      }
    }
  },
  mounted() {
    /* Hack
      In list-selection "getBoundingClientRect" is used to determine
      the height of one element, which could only be obtained if the
      element is displayed.
    */
    this.showList = false;

    document.addEventListener('click', this.closeList);
  },
  destroyed() {
    document.removeEventListener('click', this.closeList);
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

  .list-selection {
    background-color: white;
    position:      absolute;
    z-index:       99;
    left:          0;
    right:         0;
  }
}

</style>

