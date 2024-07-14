<template>
   <div>
      <h2>
         {{ foodName }}
         <img src="./img_quality.svg" v-show="foodIsFavorite" />
      </h2>
      <p>
         {{ foodDesc }}
         <button v-on:click="toggleFavorite">Favorite</button>
      </p>
   </div>
</template>

<script>
export default {
   // props: ['foodName', 'foodDesc', 'isFavorite']
   props: {
      foodName: {
         type: String,
         required: true
      },
      foodDesc: {
         type: String,
         required: false,
         default: 'This is the default description',
         validator: function(value) {
            if (20 < value.length && value.length < 50) {
               return true;
            }
            else {
               return false;
            }
         }
      },
      isFavorite: {
         type: Boolean,
         required: false,
         default: false
      }
   },
   data() {
      return {
         /*
         The this keyword is used in Vue components to refer to the instance of the component.

         In the data function, you need to initialize your local state (foodIsFavorite) with the
         value of a prop (isFavorite). To do this, you must refer to the component instance 
         to access the prop. Since props are part of the component instance, you 
         use this.isFavorite to get the value of the isFavorite prop.

         Example Without this
         If you omit this, JavaScript will not understand that isFavorite is a prop of 
         the Vue instance. Instead, it will look for a variable named isFavorite in the 
         current scope, which doesn't exist, leading to a reference error.
         */
         foodIsFavorite: this.isFavorite
      }
   },
   methods: {
      toggleFavorite() {
         this.foodIsFavorite = !this.foodIsFavorite;
      }
   }
}
</script>

<style>
img {
   height: 1.5em;
   float: right;
}
</style>