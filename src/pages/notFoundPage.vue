<template>
   <div class="container mt-5">
     <div class="row">
       <div class="col-md-6 offset-md-3 text-center">
         <h1 class="display-4">404</h1>
         <p class="lead">Oops! Page not found.</p>
         <router-link to="/" class="btn btn-primary">Go to Home</router-link>
       </div>
     </div>
   </div>
 </template>
 
 <script>
   export default {
      name: 'NotFound'
   }
 </script>
 