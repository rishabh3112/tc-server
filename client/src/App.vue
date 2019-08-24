<template>
  <div id="app">
    <div id="nav">
      <img src="./assets/2_objects.png" alt="Logo">
      <span>Shop</span>
    </div>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
body, html {
  font-family: 'Roboto', sans-serif;
}
#nav img {
  width: 50px;
  margin-right: 10px;
}

#nav {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
}

</style>
