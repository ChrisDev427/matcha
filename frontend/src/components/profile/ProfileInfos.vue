<template>
    <div class="profile--info--container">
        <form class="form-container" @submit.prevent="submitForm">
            <h3>{{ $store.getters.getUserName }}</h3>
            <div class="form-row">
                <div class="form-col">
                    <label for="firstName">{{ $t('firstName') }}</label>
                    <input v-model="formData.firstName" id="firstName" type="text" name="firstName"
                        :placeholder="$store.getters.getFirstName" :maxlength="15" />
                </div>
                <div class="form-col">
                    <label for="lastName">{{ $t('lastName') }}</label>
                    <input v-model="formData.lastName" id="lastName" type="text" name="lastName"
                        :placeholder="$store.getters.getLastName" :maxlength="15" />
                </div>
            </div>

            <div class="form-row">
                <div class="form-col email">
                    <label for="email">Email</label>
                    <input :placeholder="$store.getters.getEmail" disabled id="email" type="email" name="email" />
                </div>
                <div class="form-col age">
                    <label class="input--needed" for="age">Age<span v-if="!formData.age && !$store.getters.getAge">&#9733;</span></label>
                    <select v-model="formData.age" id="age" name="age" :class="{ 'placeholder--age': !formData.age }">
                        <option value="" disabled selected>{{ agePlaceholder }}</option>
                        <option v-for="age in ageOptions" :key="age" :value="age">
                            {{ age }}
                        </option>
                    </select>
                </div>
            </div>

            <label class="input--needed">Tags<span v-if="formData.interests.length === 0">&#9733;</span></label>
            <multiselect v-model="formData.interests" tag-placeholder="Add this as new tag"
                placeholder="Search or add a tag" :options="options" :multiple="true" :taggable="true" @tag="addNewTag">
            </multiselect>
            <div class="text--area--bio">
                <label >Bio<span v-if="actualLengthBio">{{ actualLengthBio }}/{{ maxLengthBio }}</span></label>
                <textarea v-model="formData.biography" name="bio" id="bio" rows="3" :maxlength="maxLengthBio"
                    :placeholder="$store.getters.getBio"></textarea>
            </div>
            <div class="btn--row">
                <div class="btn--col">
                    <h4>{{ $t('gender') }}</h4>
                    <button id="male" type="button" @click="setGender('Male')" :class="{
                        'btn--pushed':
                            formData.gender === 'Male' ||
                            $store.getters.getGender === 'Male',
                    }">
                        {{ $t('male') }}
                    </button>
                    <button id="female" type="button" @click="setGender('Female')" :class="{
                        'btn--pushed':
                            formData.gender === 'Female' ||
                            $store.getters.getGender === 'Female',
                    }">
                        {{ $t('female') }}
                    </button>
                </div>
                <div class="btn--col">
                    <h4>{{ $t('interestedBy') }}</h4>
                    <button type="button" @click="setSexualPref('Male', 0)" :class="{
                        'btn--pushed':
                            formData.sexualPreferences[0] === 'Male' ||
                            $store.getters.getSexPref === 'Male',
                    }">
                        {{ $t('male') }}
                    </button>
                    <button type="button" @click="setSexualPref('Female', 1)" :class="{
                        'btn--pushed':
                            formData.sexualPreferences[1] === 'Female' ||
                            $store.getters.getSexPref === 'Female',
                    }">
                        {{ $t('female') }}
                    </button>
                </div>
            </div>
            <!-- <div class="valid--btn">
                <button type="submit" :class="{ 'disabled--btn': !isFormValid }" :disabled="!isFormValid">
                    {{ $t('apply') }}
                </button>
            </div> -->
            <SendButton :btnName="$t('apply')" :disabledBtn="!isFormValid" ></SendButton>

        </form>
        <div class="text--btn">
            <router-link class="router--btn" :to="{ name: 'ResetPasswordPage', params: {} }">
                <TextButton :btnName="$t('resetPasswordBtn')"></TextButton>
            </router-link>
            <p>-</p>
            <router-link class="router--btn" :to="{ name: 'ChangeEmailPage', params: {} }">
                <TextButton :btnName="$t('changeEmailBtn')"></TextButton>
            </router-link>
        </div>
    </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { ref, watch } from "vue";
import { useStore } from "vuex";
import TextButton from "@/components/TextButton.vue";
import SendButton from '@/components/SendButton.vue';


export default {
    name: "ProfileInfos",
    components: {
        Multiselect,
        TextButton,
        SendButton,
    },
    setup() {
        const maxLengthBio = 150;
        const actualLengthBio = ref(0);
        const store = useStore();
       

        const formData = ref({
            firstName: "",
            lastName: "",
            biography: "",
            gender: "",
            sexualPreferences: ["", ""],
            age: "",
            interests: [],
        });

        const agePlaceholder = store.getters.getAge;
        const ageOptions = Array.from({ length: 83 }, (_, i) => i + 18);

        watch(
            formData,
            (newValue) => {
                if (newValue.biography) {
                    actualLengthBio.value = newValue.biography.length;
                } else {
                    actualLengthBio.value = 0;
                }
                if (newValue.gender) {
                    store.commit("setGender", "");
                }
            },
            { deep: true }
        );

        function submitForm(event) {
            event.preventDefault();
            console.log("submit form function");

            console.log("formData = ", formData.value);
            store.dispatch("updateUserInfosForm", formData.value);
        }

        return {
            formData,
            submitForm,
            maxLengthBio,
            actualLengthBio,
            agePlaceholder,
            ageOptions,
      
        };
    },
    mounted() {
        // add existing interests
        this.addTags();
    },
    data() {
        // retrieve tags from db
        const options = ["#Java", "#Vue.js", "#Javascript"];
        return {
            options,
        };
    },
    methods: {
        addNewTag(newTag) {
            const tag = newTag.startsWith("#") ? newTag : `#${newTag}`;
            if (!this.options.includes(tag)) {
                this.options.push(tag);
            }
            this.formData.interests.push(tag);
        },
        addTags() {
            const tags = this.$store.getters.getInterests;
            if (tags) {

                tags.forEach((element) => {
                    this.formData.interests.push(element);
                });
            }
        },

        setGender(value) {
            this.formData.gender = value;
        },
        setSexualPref(value, index) {
            if (!this.formData.sexualPreferences[index]) {
                this.formData.sexualPreferences[index] = value;
            } else {
                this.formData.sexualPreferences[index] = "";
            }
        },
    },
    computed: {
        isFormValid() {

            if ( (!this.$store.getters.getAge && !this.formData.age) ||
                (!this.$store.getters.getGender && !this.formData.gender) ||
                this.formData.interests.length === 0 ) {
                return false;
            }
            if (
                this.formData.age ||
                this.formData.firstName ||
                this.formData.lastName ||
                this.formData.biography ||
                this.formData.interests.length !== this.$store.getters.getInterests.length ||
                this.formData.sexualPreferences[0] ||
                this.formData.sexualPreferences[1] ||
                this.formData.gender
            ) {
                return true;
            }
            return false;
        },
       
    },
};
</script>

<style lang="scss">
.profile--info--container {
    width: 100%;
    // box-sizing: border-box;
    // border: solid 1px green;


    h3 {
        color: #a602e7b7;
        text-align: center;
        font-size: 3rem;
        font-weight: 900;
        margin: 10px 0;
        text-transform: capitalize;
    }

    .form-container {
        width: 80%;
        margin: 0 auto;
        // box-sizing: border-box;

        @media (max-width: 372px) {
            margin: 0;
        }

        label {
            display: block;
            margin: 5px 0 2px 3px;
            font-weight: bold;
            font-size: 0.8rem;
            color: var(--dark-gray);
        }

        .input--needed {
            span {
                margin-left: 5px;
                font-weight: 400;
                font-style: italic;
                font-size: 0.7rem;
                color: red;
            }
        }

        input,
        select {
            width: 100%;
            padding: 10px;
            border: none;
            color: #a602e7b7;
            font-weight: 600;
            border-radius: 5px;
            font-size: 16px;
            box-sizing: border-box;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.278);
        }
        input:focus,
        select:focus,
        textarea:focus {
            border-color: var(--pink);
            outline: none;
            box-shadow: 0 0 5px var(--pink);
        }

        select#age {
            padding: 0;
        }

        .form-row {
            display: flex;
            justify-content: space-between;
            // box-sizing: border-box;

            // gap: 10px;

            .form-col {
                flex: 0 0 48%;
                display: flex;
                flex-direction: column;
                // box-sizing: border-box;
            }

            .form-col.email {
                flex: 0 0 80%;
            }

            .form-col.age {
                flex: 0 0 16%;
                select#age {
                    width: 100%;
                    height: 38px;
                    text-align: center;
                    font-size: 14px;
                }
            }
        }

        .text--area--bio {
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            width: 100%;

            textarea {
                resize: none;
                width: 100%;
                padding: 8px;
                border: none;
                color: #a602e7b7;
                font-weight: 400;
                border-radius: 5px;
                font-size: 0.8rem;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.278);
                box-sizing: border-box;
            }
            textarea:focus {
            border-color: var(--pink);
            outline: none;
            box-shadow: 0 0 5px var(--pink);
        }

            label {
                span {
                    margin-left: 5px;
                    font-weight: 400;
                    font-style: italic;
                    font-size: 0.7rem;
                    color: green;
                }
            }
        }
    }

    .btn--row {
        display: flex;
        justify-content: space-between;
        margin: 10px;
        box-sizing: border-box;

        .btn--col {
            width: fit-content;

            h4 {
                margin: 6px 0 0px 0;
                color: var(--dark-gray);
                text-align: center;
                font-size: 1rem;
                font-weight: 700;

                @media (max-width: 400px) {
                    font-size: 0.8rem;
                }
            }

            button {
                padding: 10px 20px;
                margin: 5px;
                border: none;
                border-radius: 10px;
                background-color: #6a2cf970;
                color: rgb(206, 206, 206);
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
                transition: all 0.3s;
            }

            button:hover {
                background-color: #a602e7;
                color: white;
            }

            p {
                margin: 5px 0 0 3px;
                font-size: 0.7rem;
                color: #555;
            }
        }

        @media ((min-width: 200px) and (max-width: 600px)) or ((min-width: 812px) and (max-width: 1200px)) {
            .btn--col {
                display: grid;
                justify-items: center;
            }

            justify-content: space-evenly;
        }
    }

    .multiselect {
        width: 100%;
        border: none;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.278);
        // box-sizing: border-box;
    }

    .btn--pushed {
        background-color: #a602e7 !important;
        color: white !important;
    }

    .text--btn {
        display: flex;
        align-items: center;
        gap: 7px;
        width: fit-content;
        margin: 10px auto;

        p {
            margin: 0;
        }

        .router--btn {
            height: fit-content;
            text-decoration: none;
        }
    }

    #firstName::placeholder,
    #lastName::placeholder {
        text-transform: capitalize;
    }
    .placeholder--age {
        color: gray !important;
    }
}
</style>