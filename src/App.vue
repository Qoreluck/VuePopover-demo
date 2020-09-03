<template>
  <div id="app">
    <div class="container">
      <div class="content">
        <div class="item">
          <button class="button">Open Table</button>
        </div>
        <div class="item">
          <button class="button">Open Submit Form</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
}

body{
  margin: 0;
}

.container{
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 15px;
}

.content{
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.button{
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  font-size: 14px;
  border-radius: 4px;
  padding: 12px 20px;

  &:hover{
    background-color: #ecf5ff;
    border-color: #c6e2ff;
    color: #409eff;
  }

  &--active{
    background: #ecf5ff;
    border-color: #c6e2ff;
    color: #409eff;
  }
}

</style>
