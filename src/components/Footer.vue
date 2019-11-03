<template>
    <div id="Footer">
        <span id="copy" v-html="copyright"></span>
        <router-link to="/views/Imprint"><a id="termsOfUse" :href="termsOfUseLink">{{termsOfUse}}</a></router-link>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data: function() {
            return {
                copyright: '&copy Chi-Masters Team',
                termsOfUse: 'Impressum/Datenschutz',
                termsOfUseLink: 'https://google.de'
            }
        }
    }
</script>

<style scoped>
    #copy, #termsOfUse {
        margin-right: 5rem;
    }
    #Footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        height: 10vh;
        align-items: center;
        justify-content: flex-end;
        box-shadow:  0 -0.5vh 1vh gray;
    }
</style>