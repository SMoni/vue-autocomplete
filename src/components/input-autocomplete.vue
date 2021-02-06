<template>
  <div class="input-autocomplete" :style="styles.autocomplete">
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
      @blur                     ="$emit('blur')"
      :value                    ="taggedItem[property]"
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
    }
  },
  computed: {
    filtered: function() {

      const filterUpperCase = this.taggedItem[this.property].toUpperCase();
      const asInclude       = item => item[this.property].toUpperCase().includes(filterUpperCase);

      return this.items
        .filter(asInclude)
        .slice(0, this.visibleItems);
    },
    isInputEmpty: function() {
      return this.taggedItem[this.property] === '';
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
    isInputInItems: function() {

      const filterUpperCase = this.taggedItem[this.property].toUpperCase();
      const asEqual         = item => item[this.property].toUpperCase() === filterUpperCase;

      return this.filtered.findIndex(asEqual) >= 0;
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

      this.taggedItem[this.property] = value;

      this.emitInputWith(this.taggedItem);

      if(this.isInputNotEmpty && this.isListNotEmpty) {
        this.openList();
      } else {
        this.closeList();
      }
    },
    onSelectedListItem: function(item) {

      this.closeList();

      this.taggedItem[this.property] = item[this.property];

      this.emitInputWith(item);
    },
    emitInputWith: function(item) {
      this.$emit('input',          item);
      this.$emit('isInputInItems', this.isInputInItems);
      this.$emit('isInputEmpty',   this.isInputEmpty);
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
    }
  },
  created() {
    const current = this.value && this.value[this.property] 
      ? this.value[this.property] 
      : '';
    
    this.taggedItem = createPlaceholderWith(this.property, current);
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
      taggedItem: undefined,
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
