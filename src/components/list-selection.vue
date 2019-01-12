<template>
  <div class="list-selection" :style="styles.list">
    <div v-for="(item, index) in Items" :key="index"
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
      return this.Items.length <= 0;
    },
    numberOfItems: function() {
      return this.Items.length;
    }
  },
  watch: {
    Items: function() {
      this.currentIndex = 0;
      this.setListHeight();
    }
  },
  methods: {
    setListHeight: function() {
      this.listElement.style.height = `${this.shownItems * this.heightOfItemElement}px`;
    },
    onDown: function() {

      this.currentIndex = (this.currentIndex + 1) % this.Items.length;

      this.ensureVisibility().onDown();
    },
    onUp: function() {

      this.currentIndex = this.currentIndex >= 1 ? this.currentIndex - 1 : this.Items.length - 1;

      this.ensureVisibility().onUp();
    },
    ensureVisibility: function() {
      
      const currentElement = this.currentElement;
      const listElement    = this.listElement;

      const top    = currentElement.offsetTop - listElement.scrollTop;
      const bottom = currentElement.offsetTop - listElement.scrollTop + currentElement.getBoundingClientRect().height;
      const height = listElement.getBoundingClientRect().height;

      const isTopOutsideView    = top    < 0 || height <= top;
      const isBottomOutsideView = bottom < 0 || height <= bottom

      return {
        onUp:   () => { if(isTopOutsideView)    currentElement.scrollIntoView(true); },
        onDown: () => { if(isBottomOutsideView) currentElement.scrollIntoView(false); }
      }      
    },
    onClick: function(index) {

      if(index) {
        this.currentIndex = index;
      }

      this.$emit('selected', this.Items[this.currentIndex]);
    },
    isCurrent: function(index) {
      return this.currentIndex === index;
    }    
  },
  created() {
    if(this.isListEmpty) {
      this.Items.push(createPlaceholderWith(this.Property));
    }
  },
  mounted() {
    this.heightOfItemElement = this.currentElement.getBoundingClientRect().height;
    this.setListHeight();
  },
  data() {
    return {
      currentIndex:        0,
      heightOfItemElement: 0,
      styles: {
        list: {
          'overflow-Y':       'auto',
          'background-color': 'white',
          'position':         'absolute',
          'z-index':          '99',
          'left':             0,
          'right':            0,
        },
        item: {
          'cursor': 'pointer'
        }
      } 
    }
  }
}
</script>