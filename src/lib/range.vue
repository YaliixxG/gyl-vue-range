<template>
<div class="vue-plugin-wrap">
   <div class="vue-range-wrap">
    <div class="vue-range" ref="elem" :style="rangeStyle">
      <div class="vue-range-dot" :style="dotStyle" @touchstart = "rangeStart()"></div>
      <div class="vue-range-progress" :style="progressStyle"></div>
      <div class="vue-range-valueBox">
      <p>{{min}}</p>
      <p>{{max}}</p>
      <h3>{{nowValue}}</h3>
      </div>     
    </div>
  </div>
</div>
 
</template>

<script>
export default {
  data() {
    return {
      progressValue: null,
      translateValue: null,
      isDrag: false,
      nowValue: null
    };
  },
  props: {
    width: {
      //进度条宽
      type: [Number, String],
      default: 500
    },
    height: {
      //进度条高
      type: [Number, String],
      default: 10
    },
    dotSize: {
      //圆点大小
      type: [Number],
      default: 26
    },
    max: {
      //最大值
      type: Number,
      default: 100
    },
    min: {
      //最小值
      type: Number,
      default: 0
    }
  },
  computed: {
    rangeStyle() {
      return {
        width: this.width + "px",
        height: this.height + "px",
        background: "#b3bad1",
        margin: "0 auto"
      };
    },
    dotStyle() {
      return {
        width: this.dotSize - 4 + "px",
        height: this.dotSize - 4 + "px",
        position: "absolute",
        zIndex: 10,
        top: -(this.dotSize / 2 - this.height / 2) + "px",
        transform: "translateX(" + this.translateValue + "px)",
        borderRadius: "50%",
        background: "#2a62fe",
        border: "4px solid #f0f4f8"
      };
    },
    progressStyle() {
      return {
        width: this.progressValue + this.dotSize / 2 + "px",
        height: this.height + "px",
        background: "#2a62fe"
      };
    },
    total() {
      return this.max - this.min;
    },
    percent() {
      //比例尺
      return this.size / this.total;
    }
  },
  mounted() {
    this.$nextTick(_ => {
      this.nowValue = this.min;
      this.getStaticData();
      this.bindEvents();
    });
  },
  methods: {
    bindEvents() {
      document.addEventListener("touchmove", this.rangeMove);
      document.addEventListener("touchend", this.rangeEnd);
    },
    unbindEvents() {
      document.removeEventListener("touchmove", this.rangeMove);
      document.removeEventListener("touchend", this.rangeEnd);
    },
    getStaticData() {
      this.size = this.$refs.elem.offsetWidth;
      this.offset = this.$refs.elem.getBoundingClientRect().left;
    },
    rangeStart() {
      this.isDrag = true;
    },
    rangeMove(e) {
      if (!this.isDrag) return false;
      e = e.targetTouches[0];
      this.setValueOnPos(this.getPos(e));
      // this.setCurrentValue(v)
    },
    rangeEnd() {
      this.isDrag = false;
    },
    getPos(e) {
      // console.log('e.clientX - this.offset',e.clientX - this.offset)
      return e.clientX - this.offset;
    },
    setValueOnPos(pos) {
      this.nowValue = Math.round(pos / this.percent + this.min); //结合比例尺来算实际距离
      if (this.nowValue > this.max) this.nowValue = this.max;
      if (this.nowValue < this.min) this.nowValue = this.min;
      this.setTransform(pos);
      this.setCurrentValue(this.nowValue);
    },
    setTransform(val) {
      let value = val - this.dotSize / 2;
      if (value < 0) {
        value = -this.dotSize / 2;
        this.progressValue = 0;
      } else {
        this.progressValue = value;
      }
      if (value > this.size - this.dotSize / 2) {
        value = this.size - this.dotSize / 2;
        this.progressValue = value;
      }
      this.translateValue = value;
    },
    setCurrentValue(nowVal) {
      this.$emit('callback', nowVal)
    }
  },
  beforeDestroy() {
    this.unbindEvents();
  }
};
</script>

<style scoped>
.vue-plugin-wrap {
  width: 100%;
  height: 140px;
  padding-top: 10px;
}
.vue-range-wrap {
  width: 100%;
  position: relative;
}
.vue-range-valueBox {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  font-size: 30px;
}
p {
  margin: 0;
  padding: 0;
  width: 50%;
}
p:nth-of-type(1) {
  float: left;
  text-align: left;
}
p:nth-of-type(2) {
  float: right;
  text-align: right;
}
h3 {
  margin: 0;
  padding: 0;
  font-size: 50px;
  color: #2a62fe;
  font-weight: bolder;
  text-align: center;
}

/* h3{
  width: 60%;
  text-align: center;
  color:#2a62fe;
  font-size: 50px;
  margin: 0;
  padding: 0; 
} */
</style>

