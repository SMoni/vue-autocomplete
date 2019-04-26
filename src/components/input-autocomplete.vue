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
      :value                    ="inputValue"
      :placeholder              ="Placeholder"
    >
    <list-selection v-show="isListVisible"
      @selected    ="onSelectedListItem"
      :Items       ="filtered"
      :Property    ="Property"
      :VisibleItems="VisibleItems"
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
    },
    Placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    filtered: function() {

      const filterUpperCase = this.inputValue.toUpperCase();
      const asInclude       = item => item[this.Property].toUpperCase().includes(filterUpperCase);

      return this.Items
        .filter(asInclude)
        .slice(0, 100);
    },
    isInputNotEmpty: function() {
      return this.inputValue !== '';
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

      const top  = this.inputElement.getBoundingClientRect().bottom;
      const left = this.inputElement.getBoundingClientRect().left;

      this.listElement.style.top  = `${top}px`;
      this.listElement.style.left = `${left}px`;

      this.isListVisible = true;
    },
    closeList: function() {
      this.isListVisible = false;
    }
  },
  created() {
    this.inputValue = this.value && this.value[this.Property] ? this.value[this.Property] : ''
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
