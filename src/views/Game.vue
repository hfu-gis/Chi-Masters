<template>
    <div id="Game-Div">
        <h1>GameView</h1>
        <canvas id="Game-Canvas"></canvas>
    </div>
</template>

<script>
    export default {
        name: "Game"
    }
</script>

<style scoped>
    #Game-Div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 80vh;
    }
</style>