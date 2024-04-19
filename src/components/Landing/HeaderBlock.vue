<script>

</script>

<template>
  <div class="header-main-div">
    <img class="background-image" src="@/assets/images/header-background.png">
    <div class="main">
      <header class="header">
        <ul class="header-ul">
          <li class="logo-li">
            <img class="logo" src="@/assets/images/neuroshop-logo.png">
            <h2 class="logo-text">NEUROSHOP</h2>
          </li>
          <li>About</li>
          <li>Micromarkets</li>
          <li>Retrofit Kit</li>
          <li>Franchising</li>
          <li>
            <p>Cooperation</p>
            <img src="@/assets/images/down_arrow.png">
          </li>
          <li>EMMA - AI support</li>
          <li>
            <p>ENG</p>
            <img src="@/assets/images/down_arrow.png">
          </li>
        </ul>
      </header>
      <div class="center-block">
        <div>
          <h1 class="center-block-h1">EMMA THE AI-POWERED SUPPORT SOLUTION</h1>
          <p class="center-block-p1">Revolutionise Your Customer Support with Intelligent Automation.</p>
          <p class="center-block-p2">Emma is a cutting-edge AI support solution tailored to your business needs. <br>With customizable algorithms, communication styles, and seamless database integration, Emma streamlines your support process, ensuring efficient and consistent customer interactions.</p>
        </div>
        <div class="center-block-images">
          <img src="@/assets/images/laptop.png">
          <img class="phone-img" src="@/assets/images/phone.png">
        </div>
      </div>
    </div>
  </div>
</template>

<style>
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
 .background-image {
  position: absolute; /* Позиционирование абсолютно внутри родительского контейнера */
  top: 50%; /* Выравнивание по вертикали к центру */
  left: 50%; /* Выравнивание по горизонтали к центру */
  transform: translate(-50%, -50%) scaleX(-1); /* Сдвиг на половину ширины и высоты картинки */
  width: 100%; /* Растягивание картинки по ширине контейнера */
  height: 100%; /* Растягивание картинки по высоте контейнера */
  object-fit: cover; /* Растягивание картинки, чтобы она полностью заполнила контейнер */
  z-index: -1;
  filter: blur(20px);
  opacity: 20%;
 }
 .main {
  width: 1220px;
  margin: auto;
 }
 .header {
  display: flex;
  padding-top: 20px;
 }
 .header-main-div {
  position: relative;
  overflow: hidden;
 }
 .header-ul {
  width: 100%;
  display: flex;
  list-style: none;
  justify-content: space-between;
 }
 .header-ul li {
  display: flex;
  font-size: 15px;
  align-items: center;
 }
 .header-ul li img {
  margin-bottom: 4px;
  margin-left: 5px;
 }
 .logo-li {
  gap: 10px;
  margin-right: 50px;
 }
 .logo-text {
  font-weight: 600;
 }
 .center-block {
  display: flex;
  margin-top: 145px;
 }
 .center-block-images {
  position: absolute;
  right: 0;
 }
 .phone-img {
  position: absolute;
  left: -30px;
  top: 10%;
 }
 .center-block-h1 {
  width: 786px;
  font-size: 65px;
  font-weight: 700;
 }
 .center-block-p1 {
  margin-top: 43px;
  font-size: 25px;
  width: 485px;
  font-weight: 500;
 }
 .center-block-p2 {
  margin-top: 257px;
  width: 821px;
  font-size: 12px;
  margin-bottom: 250px;
 }
</style>
