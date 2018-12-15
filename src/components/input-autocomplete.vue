<template>
  <div class="input-autocomplete" style="position: relative; display:  inline-block;">
    <input class="input"
      @keydown.down.prevent ="onDown()"
      @keydown.up.prevent   ="onUp()"
      @keydown.enter.prevent="onEnter()"
      @keydown.esc.prevent  ="closeList()"
      @input                ="onInput($event.target.value)"
      :value                ="filter"
    >
    <list-selection v-show="isListVisible"
      :Items="filtered"
      :Property="Property"
      :VisibleItems='VisibleItems'
      ref="list"
      @selected="item => { closeList(); onSelected(item); }"
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

      const filterUpperCase = this.filter.toUpperCase();

      return this.Items.filter(item => item[this.Property].toUpperCase().includes(filterUpperCase));
    },
    isFilterNotEmpty: function() {
      return this.filter !== '';
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

      if(this.isFilterNotEmpty || this.isListVisible) {
        this.$refs.list.onClick();
      }
    },
    onInput: function(value) {

      this.filter = value;

      this.onSelected();

      if(this.isFilterNotEmpty && this.isListNotEmpty) {
        this.openList();
      } else {
        this.closeList();
      }
    },
    onSelected: function(item) {

      const placeholder = createPlaceholderWith(this.Property, this.filter);

      if(item) {
        this.filter = item[this.Property];
      }

      this.$emit('input', item || placeholder);
    },
    openList: function() {
      this.isListVisible = true;
    },
    closeList: function() {
      this.isListVisible = false;
    }
  },
  created() {
    if(!this.value || !this.value[this.Property]) {
      this.value = createPlaceholderWith(this.Property, '');
    }

    this.filter = this.value[this.Property];
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
      filter: '',
      isListVisible: true
    }
  }
}
</script>