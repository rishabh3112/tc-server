<template>
  <div class="home">
    <div id="banner">
      <div id="content">
        <h2> Sign up and start increasing userbase</h2>
        <button id="reg">Register Here</button>
        <p>Already Registered? <a href="#/login">Login</a></p>
      </div>
    </div>
    <div id="intro">
      <div id="grid-1">
        <img src="../assets/back.jpg" alt="" srcset="">
        <span>Apple</span>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
#banner {
  height: 300px;
  background: url('../assets/back.jpg');
  background-size: cover;
  background-position: center center;
  min-width: 98%;
  margin: 0 auto;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .2);
  border-radius: 5px 5px;
}

#content {
  background: #ffffff;
  max-width: 300px;
  text-align: center;
  height: 250px;
  margin: 0 auto;
  position: relative;
  top: 15px;
  border-radius: 5px;
  padding: 10px;
}

button {
  cursor: pointer;
  text-transform: capitalize !important;
  border: none;
  background: #6600ee;
  color: white;
  padding: 10px;
  border-radius: 30px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .2);
}

#grid-1 {
  display: grid;
  grid-template-rows: 25% auto;
  align-content: center;
}

#intro {
  width: 100%;
}

img {
  width: 25%;
}
</style>
