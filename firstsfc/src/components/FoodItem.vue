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