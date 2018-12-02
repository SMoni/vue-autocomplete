<template>
  <div class="list-selection">
    <div v-for="(item, index) in Items" 
      :key="index"
      :class="[{ active: index === currentIndex }, 'item', `item-${index}` ]"
      @click="onClick(index)"
    >
      {{ item[Property] }}
    </div>
  </div>
</template>

<script>
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
    },
    isSelectable: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    listElement: function() {
      return this.$el;
    },
    currentElement: function() {
      return this.$el.querySelector(`.item-${this.currentIndex}`);
    },
    shownItems: function() {

      const numberOfItems = this.Items.length;

      return this.VisibleItems < numberOfItems ? this.VisibleItems : numberOfItems;
    }
  },
  watch: {
    currentIndex: function(newValue) {
      this.$emit('changed', this.Items[newValue]);
    },
    Items: function(newValue) {
      this.currentIndex = 0;
      this.setListHeightFor(newValue.length);
    }
  },
  methods: {
    setListHeightFor: function() {
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
      
      if(index)
        this.currentIndex = index;

      this.$emit('selected', this.Items[this.currentIndex]);
    }
  },
  mounted() {

    this.heightOfItemElement = this.currentElement.getBoundingClientRect().height;

    this.setListHeightFor();
  },
  data() {
    return {
      currentIndex: 0,
      heightOfItemElement: 0
    }
  }
}
</script>

<style lang="less" scoped>
.list-selection {

  overflow-y: auto;
  position:   relative;

  .item {
    cursor: pointer;
  }
}
</style>

