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
    <list-selection v-show="isListVisible"
      :Items="filtered"
      :Property="Property"
      :VisibleItems='VisibleItems'
      ref="list"
      @selected="onSelected"
    ></list-selection>
  </div>
</template>

<script>
import ListSelection from '@/components/list-selection'

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
      return this.Items.filter(item => item.name.toUpperCase().includes(this.filter.toUpperCase()));
    }
  },
  methods: {
    onDown: function() {

      if(this.isListVisible) {
        this.$refs.list.onDown();
      }

      this.openList();
    },
    onUp: function() {
      this.$refs.list.onUp();
    },
    onEnter: function() {

      if(this.filter === '' && !this.isListVisible) {
        this.onSelected();
      } else {
        this.$refs.list.onClick();
      }
    },
    onInput: function(value) {

      this.filter = value;

      this.onSelected();

      if(this.filter !== '' && this.filtered.length > 0) {
        this.openList();
      }
    },
    onSelected: function(value) {

      this.closeList();

      const placeholder = this.$refs.list.createPlaceholderWith(this.Property, this.filter);

      if(value) {
        this.filter = value[this.Property];
      }

      this.$emit('input', value || placeholder);
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
      this.value = this.createPlaceholderWith(this.Property, '');
    }

    this.filter = this.value[this.Property];
  },
  mounted() {
    /* Hack
      In list-selection "getBoundingClientRect" is used to determine
      the height of one element, which could only be obtained if the
      element is displayed.
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

