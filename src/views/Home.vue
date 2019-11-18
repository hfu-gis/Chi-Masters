<template>
    <div id="home">
        <md-button class="md-raised md-accent">GET STARTED</md-button>
    </div>
</template>

<script>
    export default {
        name: "Home",

        components: {},
        // benötigte Komponenten
        props: {},
        // entspricht den HTML-Attributen
        data() {
            return{}
        },
        // Variablen-Speicher
        watch: {},
        // reagieren auf prop-Veränderung
        methods: [],
        // interne Methoden
        created() {}
        // Initialisierung
    }
</script>

<style scoped>
    #home {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 180vh;
        background-image: url("../assets/images/Temple.jpg");
    }
</style>