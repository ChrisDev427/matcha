<template>
    <div class="send--btn">

        <button type="submit" :class="{ 'disabled--btn': disabledBtn}" :disabled="disabledBtn">
            {{ btnName }}
        </button>

    </div>
</template>

<script>
export default {
    name: "SendButton",
    props: {
        btnName: String,
        disabledBtn: Boolean,
    }

}
</script>

<style lang="scss">
.send--btn {
    display: flex;
    justify-content: center;
    button {
        margin-top: 25px;
        height: 45px;
        width: 180px;
        border-radius: 10px;
        border: none;
        color: white;
        font-weight: 600;
        font-size: 1.2rem;
        transition: all 0.3s;
        cursor: pointer;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.381);
        background-image: linear-gradient(to right, #ff24a7af, #8890feb2);

        &:hover {
            background-image: linear-gradient(to right, #ff24a78a, #8890fe90);
            color: var(--purple);
            transform: scale(1.05);
        }
    }
    .disabled--btn {
        opacity: 0.6;
        cursor: default;
        
        &:hover {
            background-image: linear-gradient(to right, #ff24a7af, #8890feb2);
            color: white;
            transform: none;
        }
    }
}
</style>