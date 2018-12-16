<template>
  <div class="input-autocomplete" :style="styles.autocomplete">
    <input class="input"
      @keydown.down.prevent ="onDown()"
      @keydown.up.prevent   ="onUp()"
      @keydown.enter.prevent="onEnter()"
      @keydown.esc.prevent  ="closeList()"
      @input                ="onInput($event.target.value)"
      :value                ="inputValue"
    >
    <list-selection v-show="isListVisible"
      :Items="filtered"
      :Property="Property"
      :VisibleItems='VisibleItems'
      ref="list"
      @selected="onSelectedListItem"
    ></list-selection>
  </div>
</template>

<script>
/* eslint-disable */
import ListSelection from '@/components/list-selection'
import { createPlaceholderWith } from '@/components/tools'

export default {
  name: 'input-autocomplete',
  components: {
    ListSelection
  },
  props: {
    value: {
      type: Object
    },
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

      const filterUpperCase = this.inputValue.toUpperCase();
      const asInclude       = item => item[this.Property].toUpperCase().includes(filterUpperCase);

      return this.Items.filter(asInclude);
    },
    isInputNotEmpty: function() {
      return this.inputValue !== '';
    },
    isListNotEmpty: function() {
      return this.filtered.length > 0;
    }
  },
  methods: {
    onDown: function() {

      if(this.isListVisible) {
        this.$refs.list.onDown();
      } else {
        this.openList();
      }
    },
    onUp: function() {

      if(this.isListVisible) {
        this.$refs.list.onUp();
      }
    },
    onEnter: function() {

      if(this.isListVisible && this.isListNotEmpty) {
        this.$refs.list.onClick();
      }
    },
    onInput: function(value) {

      this.inputValue = value;

      this.emitInputWith(createPlaceholderWith(this.Property, this.inputValue));

      if(this.isInputNotEmpty && this.isListNotEmpty) {
        this.openList();
      } else {
        this.closeList();
      }
    },
    onSelectedListItem: function(item) {

      this.closeList();
      
      this.inputValue = item[this.Property];
      
      this.emitInputWith(item);
    },
    emitInputWith: function(item) {
      this.$emit('input', item);
    },
    openList: function() {
      this.isListVisible = true;
    },
    closeList: function() {
      this.isListVisible = false;
    }
  },
  created() {

    this.inputValue = this.value || this.value[this.Property] 
      ? this.value[this.Property]
      : createPlaceholderWith(this.Property, '');
  },
  mounted() {
    /* Hack
      In list-selection "getBoundingClientRect" is used to determine
      the height of one element, which could only be obtained if the
      element is displayed.

      So make it visible first per data.isListVisible and close it after mounting :/
    */
    this.closeList();

    document.addEventListener('click', this.closeList);
  },
  destroyed() {
    document.removeEventListener('click', this.closeList);
  },
  data() {
    return {
      inputValue: '',
      isListVisible: true,
      styles: {
        autocomplete: {
          'position': 'relative',
          'display':  'inline-block'
        }
      }
    }
  }
}
</script>