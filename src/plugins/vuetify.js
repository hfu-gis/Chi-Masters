import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#3f51b5',
                secondary: '#ff9600',
                accent: '#c80000',
                error: '#b71c1c',
            },
        },
    },
});
