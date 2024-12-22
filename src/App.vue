<!-- App.vue -->
<template>
  <div id="app">
    <h1>Photo Grid Collage</h1>
    <div class="controls">
      <label for="grid-size">选择网格大小：</label>
      <select v-model="gridSize" @change="generateGrid">
        <option v-for="n in 9" :key="n + 1" :value="n + 1">
          {{ n + 1 }} x {{ n + 1 }}
        </option>
      </select>

      <input type="file" multiple accept="image/*" @change="handleFileUpload" />

      <button @click="exportImage">导出为 JPEG</button>
      <a v-if="exportedImage" :href="exportedImage" download="collage.jpg"
        >下载图片</a
      >
    </div>
    <div>
      <label for="grid-gap-slider">调整网格间距：{{ gridGap }}px</label>
      <input
        id="grid-gap-slider"
        type="range"
        min="2"
        max="20"
        v-model="gridGap"
      />
    </div>

    <div class="grid-container" :style="gridStyle" ref="gridContainer">
      <GridCell
        v-for="(cell, index) in gridCells"
        :key="cell.id"
        :image="cell.image"
        @updateImage="updateCellImage(index, $event)"
      />
    </div>
  </div>
</template>

<script>
import GridCell from "./GridCell.vue";
import html2canvas from "html2canvas";

export default {
  components: {
    GridCell,
  },
  data() {
    return {
      gridSize: 2,
      gridGap: 10, // px
      gridCells: [],
      uploadedImages: [],
      exportedImage: null,
    };
  },
  computed: {
    gridStyle() {
      return {
        "grid-template-columns": `repeat(${this.gridSize}, 1fr)`,
      };
    },
  },
  methods: {
    generateGrid() {
      const totalCells = this.gridSize * this.gridSize;
      this.gridCells = Array.from({ length: totalCells }, (_, index) => ({
        id: index,
        image: null,
      }));
      // 重置已上传的图片
      this.uploadedImages = [];
      this.exportedImage = null;
    },
    handleFileUpload(event) {
      const files = Array.from(event.target.files);
      const totalCells = this.gridSize * this.gridSize;
      const remainingSlots = totalCells - this.uploadedImages.length;
      if (files.length > remainingSlots) {
        alert(`您最多还能上传 ${remainingSlots} 张图片`);
        return;
      }
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImages.push(e.target.result);
          this.placeImageInGrid(e.target.result);
        };
        reader.readAsDataURL(file);
      });
      // 清空文件输入框的值
      event.target.value = "";
    },
    placeImageInGrid(imageData) {
      // 找到第一个没有图片的网格单元
      for (let i = 0; i < this.gridCells.length; i++) {
        if (!this.gridCells[i].image) {
          this.gridCells[i].image = imageData;
          break;
        }
      }
    },
    updateCellImage(index, imageData) {
      this.$set(this.gridCells, index, {
        ...this.gridCells[index],
        image: imageData,
      });
    },
    exportImage() {
      html2canvas(this.$refs.gridContainer, { useCORS: true }).then(
        (canvas) => {
          this.exportedImage = canvas.toDataURL("image/jpeg");
        }
      );
    },
  },
  mounted() {
    this.generateGrid();
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
}

.grid-container {
  display: grid;
  gap: v-bind(gridGap + "px");
  margin: 10px;
}

.grid-cell {
  width: 100%;
  padding-bottom: 100%; /* 使单元格为正方形 */
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
}

a {
  margin-left: 10px;
}
</style>
