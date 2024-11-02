<template>
    <div class="change--password--container">
        <div v-if="!$store.getters.getIsFormSent">
            <h3>{{ $t('changePasswordTitle') }}</h3>
            <form action="" class="change--password--form" @submit.prevent="submitForm">

                <input class="input-password" name="password" v-model="formData.password" type="password" :placeholder="$t('password')" />

                <input name="new-password" v-model="formData.newPassword" :class="{}" type="password" :placeholder="$t('newPassword')" />
                <input name="confirm-password" v-model="repeatPassword" :class="{}" type="password" :placeholder="$t('passwordConfirm')" />

                <SendButton :btnName="$t('send')" :disabledBtn="!isFormValid" ></SendButton>
            </form>
        </div>

        <div v-if="$store.getters.getServerMessage === 'emailUpdated'">
            <h3 v-html="replace_newLine_to_br_tags($t('changeEmailSuccess'))"></h3>
        </div>

        <div v-if="$store.getters.getServerMessage === 'serverError'">
            <h3>{{ $t("serverErrorText") }}</h3>
        </div>

        <div v-if="$store.getters.getServerMessage === 'serverError' || $store.getters.getServerMessage === ''">
            <ReturnButton @click="goToProfilePage"></ReturnButton>
        </div>
    </div>

</template>

<script>
import { ref, watch } from "vue";
import ReturnButton from '@/components/ReturnButton.vue';
import SendButton from '@/components/SendButton.vue';

export default {
    name: "ResetPassword",
    components: {
        ReturnButton,
        SendButton,
    },
    methods: {
        goToProfilePage() {
            this.$router.push({ name: "ProfilePage" });
            this.$store.commit("setServerMessage", '');
        },
    },
    setup() {

        let formData = ref({

            password: "",
            newPassword: "",

        });
        watch(
            formData,
            (newValue) => {
                console.log(newValue);
            },
            { deep: true }
        );

        let repeatPassword = ref ('');
        watch(
            repeatPassword,
            (newValue) => {
                console.log(newValue);
            },
        );

        return {
            formData,
            repeatPassword,
        }

    },
    computed: {
        isFormValid() {
            
            return false;
        }
    },
}
</script>

<style lang="scss">
.change--password--container {
    position: relative;
    display: grid;
    justify-items: center;
    margin: 0px 20px 20px 20px;
    width: 370px;
    height: auto;
    padding: 40px;
    border-radius: 15px;
    background-image: linear-gradient(to right, #ff24a7af, #8890feb2);
    box-shadow: 0 0 28px rgba(0, 0, 0, 0.498);
    cursor: default;
    user-select: none;

    h3 {
        margin: -13px 0 15px 0;
        color: white;
        text-align: center;
        font-weight: 900;
        font-size: 1.5rem;
        // text-transform: capitalize;
        text-shadow: 0 0 18px rgba(255, 255, 255, 0.438);
    }

    p {
        // border: solid 1px red;
        margin: 0px 0 10px 0;
        color: white;
        font-size: 0.8rem;
        font-weight: 500;
        text-align: center;
    }

    .change--password--form {
        display: grid;
        justify-items: center;
        // width: 80%;
        .input-password {
            margin-bottom: 25px;
        }

        input {
            padding: 6px;
            margin: 10px;
            width: 100%;
            border: none;
            outline: none;
            border-radius: 8px;
            text-align: center;
            font-weight: 600;
            background-color: var(--purple-placeholder-bg);
            color: var(--purple);
        }

        input::placeholder {
            color: white;
            font-weight: 400;
        }

    }

}
</style>