<template>
  <div>
    <div class="list-selection"
      :tabindex="isSelectable ? 0 : false"
      @keydown.down.prevent ="onDown"
      @keydown.up.prevent   ="onUp"
    >
      <div v-for="(item, index) in Items" 
        :key="index"
        :class="[{ active: index === currentIndex }, 'item', `item-${index}` ]"
        @click="onClick(index)"
      >
        {{ item[Property] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'autocomplete-data',
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
      return this.$el.querySelector('.list-selection');
    },
    currentElement: function() {
      return this.$el.querySelector(`.item-${this.currentIndex}`);
    }
  },
  watch: {
    currentIndex: function(newValue) {
      this.$emit('selected', this.Items[newValue]);
    }
  },
  methods: {
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
      this.currentIndex = index;
    }
  },
  mounted() {
    this.listElement.style.height = `${this.VisibleItems * this.currentElement.getBoundingClientRect().height}px`
  },
  data() {
    return {
      currentIndex: 0
    }
  }
}
</script>

<style scoped>
.list-selection {
  overflow-y: scroll;
  position:   relative;
}
</style>