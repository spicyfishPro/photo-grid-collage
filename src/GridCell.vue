<!-- GridCell.vue -->
<template>
  <div class="grid-cell" ref="cell">
    <img
      v-if="image"
      :src="image"
      class="draggable"
      ref="image"
      :style="imageStyle"
    />
    <div v-else class="placeholder">拖拽或点击添加图片</div>
  </div>
</template>

<script>
import interact from "interactjs";

export default {
  props: {
    image: String,
  },
  emits: ["updateImage"],
  data() {
    return {
      scale: 1,
      position: { x: 0, y: 0 },
      imageNaturalWidth: 0,
      imageNaturalHeight: 0,
      cellWidth: 0,
      cellHeight: 0,
      initialScale: 1,
    };
  },
  computed: {
    imageStyle() {
      return {
        transform: `translate(${this.position.x}px, ${this.position.y}px) scale(${this.scale})`,
      };
    },
  },
  mounted() {
    if (this.image) {
      this.$nextTick(() => {
        this.initializeImage();
      });
      if (this.$refs.image) {
        this.$refs.image.addEventListener("wheel", this.onWheel);
      }
    }
  },
  beforeUnmount() {
    if (this.$refs.image) {
      this.$refs.image.removeEventListener("wheel", this.onWheel);
    }
  },
  watch: {
    image(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.initializeImage();
          if (this.$refs.image) {
            this.$refs.image.addEventListener("wheel", this.onWheel);
          }
        });
      }
    },
  },
  methods: {
    initializeImage() {
      this.position = { x: 0, y: 0 };
      this.scale = 1;

      const img = new Image();
      img.onload = () => {
        this.imageNaturalWidth = img.width;
        this.imageNaturalHeight = img.height;

        this.$nextTick(() => {
          const cellRect = this.$refs.cell.getBoundingClientRect();
          this.cellWidth = cellRect.width;
          this.cellHeight = cellRect.height;

          const widthScale = this.cellWidth / this.imageNaturalWidth;
          const heightScale = this.cellHeight / this.imageNaturalHeight;
          this.initialScale = Math.max(widthScale, heightScale);
          this.scale = this.initialScale;

          const adjustedWidth = this.imageNaturalWidth * this.initialScale;
          const adjustedHeight = this.imageNaturalHeight * this.initialScale;
          this.position.x = (this.cellWidth - adjustedWidth / this.scale) / 2;
          this.position.y = (this.cellHeight - adjustedHeight / this.scale) / 2;

          this.initInteract();
        });
      };
      img.src = this.image;
    },
    initInteract() {
      interact(this.$refs.image)
        .draggable({
          modifiers: [
            interact.modifiers.restrictRect({
              restriction: this.$refs.cell,
              endOnly: true,
            }),
          ],
          listeners: {
            move: (event) => {
              this.position.x += event.dx;
              this.position.y += event.dy;

              event.target.style.transform = `translate(${this.position.x}px, ${this.position.y}px) scale(${this.scale})`;
            },
          },
        })
        .gesturable({
          listeners: {
            move: (event) => {
              this.scale *= 1 + event.ds;
              this.scale = Math.max(
                this.initialScale * 0.05,
                Math.min(this.scale, this.initialScale * 10)
              );

              event.target.style.transform = `translate(${this.position.x}px, ${this.position.y}px) scale(${this.scale})`;
            },
          },
        });
    },
    onWheel(event) {
      event.preventDefault();

      const delta = event.deltaY < 0 ? 0.05 : -0.05;
      const scaleFactor = 1 + delta;
      const newScale = this.scale * scaleFactor;

      const minScale = this.initialScale * 0.5;
      const maxScale = this.initialScale * 3;
      this.scale = Math.max(minScale, Math.min(newScale, maxScale));

      //   const rect = this.$refs.image.getBoundingClientRect();
      //   const offsetX = event.clientX - rect.left;
      //   const offsetY = event.clientY - rect.top;
      //   console.log(offsetX, offsetY);

      // 哼哼啊啊啊啊鼠标中心缩放写不出来！！！！
      const aspectRatio = this.imageNaturalWidth / this.imageNaturalHeight;
      const deltaX = delta; //* offsetX;
      const deltaY = delta * aspectRatio; // * offsetY;

      this.position.x -= deltaX;
      this.position.y -= deltaY;

      this.$refs.image.style.transform = `translate(${this.position.x}px, ${this.position.y}px) scale(${this.scale})`;
    },
  },
};
</script>

<style>
.grid-cell {
  position: relative;
  overflow: hidden;
  background-color: #e0e0e0;
}

.draggable {
  position: absolute;
  left: 0;
  top: 0;
  touch-action: none;
  user-select: none;
  /* 确保图片尺寸由 transform 控制 */
  max-width: none;
  max-height: none;
}

.placeholder {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 14px;
  cursor: pointer;
}
</style>
