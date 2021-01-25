<template>
  <div class="list-selection" :style="styles.list">
    <div v-for="(item, index) in items" :key="index"
      @click="onClick(index)"
      :class="[{ active: isCurrent(index) }, 'item', `item-${index}` ]"
      :style="styles.item"
    >{{ item[Property] }}</div>
  </div>
</template>

<script>
import { createPlaceholderWith } from '@/components/tools'

export default {
  name: 'list-selection',
  props: {
    items: {
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
    listElement: function() {
      return this.$el;
    },
    currentElement: function() {
      return this.$el.querySelector(`.item-${this.currentIndex}`);
    },
    shownItems: function() {
      return this.VisibleItems < this.numberOfItems ? this.VisibleItems : this.numberOfItems;
    },
    isListEmpty: function() {
      return this.numberOfItems <= 0;
    },
    numberOfItems: function() {
      return this.items.length;
    },
    heightOfItemElement: function() {
      
      const properties = [
        'height',
        'padding-top',
        'padding-bottom',
        'border-top-width',
        'border-bottom-width',
        'margin-top',
        'margin-bottom'
      ];

      const computedStyle = window.getComputedStyle(this.currentElement);
      const getValue      = key => computedStyle.getPropertyValue(key).replace('px', '');
      const parseToFloat  = value => parseFloat(value);
      const sumUp         = (previous, current) => previous + current;

      return properties
        .map(getValue)
        .map(parseToFloat)
        .reduce(sumUp);
    }
  },
  watch: {
    items: function() {
      this.currentIndex = 0;
      this.setListHeight();
    }
  },
  methods: {
    setListHeight: function() {
      this.listElement.style.height = `${this.shownItems * this.heightOfItemElement}px`;
    },
    onDown: function() {

      this.currentIndex = (this.currentIndex + 1) % this.items.length;

      this.ensureVisibility().onDown();
    },
    onPageDown: function() {

      this.currentIndex = (this.currentIndex + this.shownItems) % this.items.length;

      this.ensureVisibility().onDown();
    },
    onUp: function() {

      this.currentIndex = this.currentIndex >= 1 ? this.currentIndex - 1 : this.items.length - 1;

      this.ensureVisibility().onUp();
    },
    onPageUp: function() {

      this.currentIndex = this.currentIndex >= this.shownItems ? this.currentIndex - this.shownItems : this.items.length - 1;

      this.ensureVisibility().onUp();
    },
    ensureVisibility: function() {
      
      const currentElement = this.currentElement;
      const listElement    = this.listElement;

      const top    = currentElement.offsetTop - listElement.scrollTop;
      const bottom = currentElement.offsetTop - listElement.scrollTop + this.heightOfItemElement;
      const height = listElement.getBoundingClientRect().height;

      const isTopOutsideView    = top    < 0 || height <= top;
      const isBottomOutsideView = bottom < 0 || height <= bottom

      return {
        onUp:   () => { if(isTopOutsideView)    currentElement.scrollIntoView(true); },
        onDown: () => { if(isBottomOutsideView) currentElement.scrollIntoView(false); }
      }      
    },
    ensureHeightOnElement: function() {

      const computedStyle = window.getComputedStyle(this.currentElement);
      const getValueOf    = key => computedStyle.getPropertyValue(key);
      const height        = getValueOf('height');
      const lineHeight    = getValueOf('line-height');

      // m/
      if(height === 'auto') {
        this.currentElement.style.height = lineHeight;
      }
    },
    onClick: function(index) {

      if(index) {
        this.currentIndex = index;
      }

      this.$emit('selected', this.items[this.currentIndex]);
    },
    isCurrent: function(index) {
      return this.currentIndex === index;
    }  
  },
  created() {
    if(this.isListEmpty) {
      this.items.push(createPlaceholderWith(this.Property));
    }
  },
  mounted() {

    this.ensureHeightOnElement();
    this.setListHeight();
  },
  data() {
    return {
      currentIndex: 0,
      styles: {
        list: {
          'overflow-Y':       'auto',
          'background-color': 'white',
          'position':         'fixed',
          'z-index':          '99'
        },
        item: {
          'cursor':      'pointer',
          'white-space': 'nowrap',
          'padding':     '0 3rem 0 .5rem'
        }
      } 
    }
  }
}
</script>