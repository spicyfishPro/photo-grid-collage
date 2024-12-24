<!-- App.vue -->
<template>
  <div id="app">
    <h1>Photo Grid Collage: n宫格图片生成器</h1>
    <div class="controls">
      <div class="control-item">
        <label for="grid-size">选择网格大小：</label>
        <select v-model="gridSize" @change="generateGrid">
          <option v-for="n in 9" :key="n + 1" :value="n + 1">
            {{ n + 1 }} x {{ n + 1 }}
          </option>
        </select>
      </div>
      <div class="control-item">
        <label class="custom-file-upload">
          <input
            type="file"
            multiple
            accept="image/*"
            @change="handleFileUpload"
          />
          上传图片
        </label>
      </div>
      <div class="control-item">
        <label for="grid-gap-slider">网格间距：{{ gridGap }}px</label>
      </div>
      <div class="control-item" id="grid-gap-slider-container">
        <input
          id="grid-gap-slider"
          type="range"
          min="0"
          max="20"
          v-model="gridGap"
        />
      </div>
      <div class="control-item">
        <button class="export-button" @click="exportImage">导出为 JPG</button>
        <button
          class="download-button"
          v-if="exportedImage"
          :href="exportedImage"
          download="collage.jpg"
        >
          下载图片
        </button>
      </div>
    </div>
    <div>
      <p class="help-text">
        Tips：拖动图片改变位置，缩放图片或滚动鼠标滚轮更改大小。
      </p>
    </div>
    <div class="grid-container" :style="gridStyle" ref="gridContainer">
      <GridCell
        v-for="(cell, index) in gridCells"
        :key="cell.id"
        :image="cell.image"
        @updateImage="updateCellImage(index, $event)"
      />
    </div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <footer>
      <p>
        © 2024~2025 spicyfish. All rights reserved.
        所有图片均在本地处理，不会上传到服务器。
      </p>
    </footer>
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
      gridGap: 0, // px
      gridCells: [],
      uploadedImages: [],
      exportedImage: null,
      isLoading: false,
    };
  },
  computed: {
    gridStyle() {
      return {
        "grid-template-columns": `repeat(${this.gridSize}, 1fr)`,
        gap: `${this.gridGap}px`,
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
      this.isLoading = true; // 开始加载动画
      html2canvas(this.$refs.gridContainer, {
        useCORS: true,
        scale: 3,
      })
        .then((canvas) => {
          this.exportedImage = canvas.toDataURL("image/jpeg");
          this.isLoading = false; // 结束加载动画
        })
        .catch(() => {
          this.isLoading = false; // 即使发生错误也要结束加载动画
          alert("导出失败，请重试。");
        });
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
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 2em;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 20px;
}

.control-item {
  display: flex;
  align-items: center;
}

.control-item label {
  margin-right: 5px;
}

.control-item select,
.control-item input[type="range"] {
  padding: 5px;
  font-size: 14px;
}

.export-button {
  margin-left: auto;
  font-size: 14px;
}

.download-button {
  margin-left: 10px;
  background-color: #4caf50;
  font-size: 14px;
}

.download-button:hover {
  background-color: #45a049;
}

#grid-gap-slider-container {
  margin-right: auto;
  margin-left: 10px;
}

button {
  padding: 6px 12px;
  cursor: pointer;
  background-color: #2196f3;
  color: #fff;
  border: 0px;
  /* border: 2px solid #2196f3; */
  border-radius: 4px;
}

button:hover {
  background-color: #0b7dda;
  /* border-color: #0b7dda; */
}

a {
  margin-left: 10px;
  color: #4caf50;
}

.grid-container {
  display: grid;
  max-width: 1000px;
  margin: 10px auto;
}

.grid-cell {
  width: 100%;
  padding-bottom: 100%; /* 使单元格为正方形 */
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
}

/* 自定义上传按钮 */
.custom-file-upload {
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  background-color: #2196f3;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
}

.custom-file-upload:hover {
  background-color: #0b7dda;
}

.custom-file-upload input[type="file"] {
  display: none;
}

/* 加载动画样式 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #333;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

footer {
  margin-top: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
