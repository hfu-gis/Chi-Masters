<template>
    <md-toolbar id="Footer" md-elevation="4">
        <span id="copy" v-html="copyright"></span>
        <router-link to="/views/Imprint"><a id="termsOfUse" :href="termsOfUseLink">{{termsOfUse}}</a></router-link>
    </md-toolbar>
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
        display: flex;
        justify-content: flex-end;
        bottom: 0;
    }
</style>