<template>
  <div class="register--fail--server--container fade-In">
    <div class="text">
      <h3>{{ $t("errorTitle") }}</h3>
      <p
        id="sub--title"
        v-html="replace_newLine_to_br_tags($t('serverErrorText'))"
      ></p>
    </div>
   
    <ReturnButton @click="goToRegisterPage"></ReturnButton>

  </div>
</template>
  
  <script>

import { replace_newLine_to_br_tags } from "@/libft/libft.js";
import ReturnButton from '@/components/ReturnButton.vue';

export default {
  name: "RegisterErrorServer",
  components: {
    ReturnButton,
  },
  methods: {
    goToRegisterPage() {
      this.$store.commit('setIsFormSent', false);
      this.$store.commit('setServerMessage', '');
      this.$router.push({ name: 'RegisterPage' });
    }
  },

  setup() {
   
    return {
    
      replace_newLine_to_br_tags,
    };
  },
};
</script>
  
  <style lang=scss>
.register--fail--server--container {
  position: relative;
  height: auto;
  width: auto;
  max-width: 600px;
  margin: 25px;
  padding: 10px 20px 20px 20px;
  border-radius: 15px;
  background-image: linear-gradient(to right, #ff24a7af, #8890feb2);
  box-shadow: 0 0 28px rgba(0, 0, 0, 0.498);
  cursor: default;
  user-select: none;

  .text {
    h3 {
      margin: 0;
      padding: 0;
      color: white;
      text-align: center;
      font-weight: 900;
      text-transform: capitalize;
      font-size: calc(min(3vw + 2vh, 50px));
      text-shadow: 0 0 18px rgba(255, 255, 255, 0.438);
    }
    p {
      // border: solid 1px white;
      width: 80%;
      font-weight: 400;
      color: white;
      text-align: center;
      padding: 10px;
      font-size: calc(min(1vw + 1.1vh, 15px));
      margin: auto;
      word-wrap: break-word;
    }
  }
  
}
</style>