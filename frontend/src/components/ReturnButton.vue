<template>
    <div class="return--btn">
       
        <span><i class="fa-solid fa-circle-arrow-left"></i></span>
       
    </div>
</template>

<script>
export default {
    name: "ReturnButton",

}
</script>

<style lang="scss">
.return--btn {
       
        position: absolute;
        left: 15px;
        bottom: 15px;

        span {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            color: white;
            transition: all ease-in-out 0.3s;

            &:hover {
                color: var(--light-pink);
            }
        }
    }
</style>