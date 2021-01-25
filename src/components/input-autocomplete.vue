<template>
  <div class="input-autocomplete" :style="styles.autocomplete">
    {{ allowTagging }}
    <input class="input"
      @focus                    ="$event.target.select()"
      @keydown.down.prevent     ="onDown()"
      @keydown.page-down.prevent="onPageDown()"
      @keydown.up.prevent       ="onUp()"
      @keydown.page-up.prevent  ="onPageUp()"
      @keydown.enter.prevent    ="onEnter()"
      @keydown.esc.prevent      ="closeList()"
      @keydown.tab              ="onEnter()"
      @input                    ="onInput($event.target.value)"
      @blur                     ="onBlur()"
      :value                    ="inputValue"
      :placeholder              ="placeholder"
    >
    <list-selection v-show="isListVisible"
      @selected    ="onSelectedListItem"
      :items       ="filtered"
      :property    ="property"
      :visibleItems="visibleItems"
      ref          ="list"
    ></list-selection>
  </div>
</template>

<script>
import Vue                       from 'vue'
import ListSelection             from '@/components/list-selection'
import { createPlaceholderWith } from '@/components/tools'

Vue.config.keyCodes = {
  'page-up': 33,
  'page-down': 34
}

export default {
  name: 'input-autocomplete',
  components: {
    ListSelection
  },
  props: {
    value: {
      type: Object
    },
    items: {
      type: Array,
      default: () => []
    },
    property: {
      type: String,
      required: true
    },
    visibleItems: {
      type: Number,
      default: 10,
      validator: function (value) {
        return value >= 1;
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    allowTagging: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    filtered: function() {

      const filterUpperCase = this.inputValue.toUpperCase();
      const asInclude       = item => item[this.property].toUpperCase().includes(filterUpperCase);

      return this.items
        .filter(asInclude)
        .slice(0, 100);
    },
    isInputEmpty: function() {
      return this.inputValue === '';
    },
    isInputNotEmpty: function() {
      return !this.isInputEmpty;
    },
    isListEmpty: function() {
      return this.filtered.length <= 0;
    },
    isListNotEmpty: function() {
      return !this.isListEmpty;
    },
    listElement: function() {
      return this.$el.querySelector('.list-selection');
    },
    inputElement: function() {
      return this.$el.querySelector('.input');
    }
  },
  methods: {
    onDown: function() {

      if(this.isListEmpty) {
        return;
      }

      if(this.isListVisible) {
        this.$refs.list.onDown();
      } else {
        this.openList();
      }
    },
    onPageDown: function() {

      if(this.isListEmpty) {
        return;
      }

      if(this.isListVisible) {
        this.$refs.list.onPageDown();
      } else {
        this.openList();
      }
    },
    onUp: function() {

      if(this.isListVisible) {
        this.$refs.list.onUp();
      }
    },
    onPageUp: function() {

      if(this.isListVisible) {
        this.$refs.list.onPageUp();
      }
    },
    onEnter: function() {

      if(this.isListVisible && this.isListNotEmpty) {
        this.$refs.list.onClick();
      }
    },
    onInput: function(value) {

      this.inputValue = value;

      if(this.isInputEmpty || this.allowTagging) {
        this.emitInputWith(createPlaceholderWith(this.property, this.inputValue));
      }

      if(this.isInputNotEmpty && this.isListNotEmpty) {
        this.openList();
      } else {
        this.closeList();
      }
    },
    onSelectedListItem: function(item) {

      this.closeList();

      this.inputValue = item[this.property];

      this.emitInputWith(item);
    },
    emitInputWith: function(item) {
      this.$emit('input', item);
    },
    openList: function() {

      const windowHeight = window.innerHeight;
      const listHeight   = parseFloat(this.listElement.style.height.replace('px', ''));

      const clientRect   = this.inputElement.getBoundingClientRect();

      const top = clientRect.bottom + listHeight < windowHeight
        ? clientRect.bottom
        : clientRect.top - listHeight
      ;

      const left = clientRect.left;

      this.listElement.style.top  = `${top}px`;
      this.listElement.style.left = `${left}px`;

      this.isListVisible = true;
    },
    closeList: function() {
      this.isListVisible = false;
    },
    onBlur: function() {
      if(!this.allowTagging && this.isListEmpty) {
        this.inputValue = '';
        this.emitInputWith(createPlaceholderWith(this.property, ''));
      }      
    }
  },
  created() {
    this.inputValue = this.value && this.value[this.property] ? this.value[this.property] : '';
  },
  mounted() {
    document.addEventListener('scroll', this.closeList);
    document.addEventListener('click',  this.closeList);
  },
  destroyed() {
    document.removeEventListener('scroll', this.closeList);
    document.removeEventListener('click',  this.closeList);
  },
  data() {
    return {
      inputValue: '',
      isListVisible: false,
      styles: {
        autocomplete: {
          'display': 'inline-block'
        }
      }
    }
  }
}
</script>
