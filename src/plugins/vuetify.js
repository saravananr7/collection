import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#0037B7',
            secondary: '#0037B7',    //blue
    
          },
          dark: {
            primary: '#0037B7',
            secondary: "#0037B7",   //blue
          },
        },
      },
});
