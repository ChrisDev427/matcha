<template>
  <section>
    <template v-if="!$store.getters.getIsConnected">
      <div class="home">
        <div class="main--title fade-In">
          <h1 class="title--line--1">swipe right,</h1>
          <h1 class="title--line--2">match,</h1>
          <h1 class="title--line--3" id="date">date !</h1>
        </div>
        <router-link class="create--account--btn" :to="{ name: 'RegisterPage', params: {} }">
          <span>{{ $t("accountCreate_btn") }}</span>
        </router-link>
      </div>
    </template>
    <template v-if="$store.getters.getIsConnected">
      <MainPage />
    </template>
  </section>
</template>

<script>
import { useI18n } from "vue-i18n";
import MainPage from "@/pages/MainPage.vue";

export default {
  name: "HomePage",

  components: {
    MainPage,
  },



  setup() {
    const { t } = useI18n();
    // Utilisation de la fonction de traduction
    const accountCreate_btn = t("accountCreate_btn");

    return { accountCreate_btn };
  },
};
</script>


<style lang="scss" scoped>
@keyframes slide-from-left {
  0% {
    transform: translateX(-150%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-from-right {
  0% {
    transform: translateX(150%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-from-bottom {
  0% {
    transform: translateY(250%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.home {
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100vh;
  user-select: none;

  .main--title {
    // margin-top: 80px;
    cursor: default;
    height: fit-content;
    margin-top: 50px;

    h1 {
      display: grid;
      justify-content: center;
      color: white;
      text-transform: capitalize;
      font-size: calc(min(5vw + 4.5vh, 150px));
      font-weight: 500;
      margin: 15px;

      &.title--line--1 {
        animation: slide-from-left 1s forwards;
      }
      &.title--line--2 {
        animation: slide-from-right 1.2s forwards;
      }
      &.title--line--3 {
        animation: slide-from-bottom 1.3s forwards;
      }

    }

    #date {
      font-weight: 900;
      text-transform: uppercase;
    }

    @media (min-width: 200px) and (max-width: 700px) {
      margin-top: 100px;
    }
  }

  .create--account--btn {
    justify-self: center;
    text-decoration: none;
    height: fit-content;
    z-index: 1200;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 200px;
      border-radius: 10px;

      color: rgb(255, 255, 255);

      background-image: linear-gradient(to right, #ff24a7, #8890fe);
      /* Dégradé de couleur */

      font-size: 1.2rem;
      font-weight: 500;
      transition: all 0.2s;
      opacity: 1;
      cursor: pointer;

      &:hover {
      
        background-image: linear-gradient(to right, #ff24a796, #8890fe8e);
        box-shadow: 0 0 8px #0000008c;
      }
    }
  }
}
</style>