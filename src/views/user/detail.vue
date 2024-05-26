<template>
   <div class="container mt-5">
     <div class="row">
       <div class="col-md-12">
         <div class="card border-0 p-4 rounded shadow">
            <h5 class="fw-bold">User Details</h5>
            <hr>
            <div class="mb-3">
               <strong>ID:</strong> {{ user.id }}
            </div>
            <div class="mb-3">
               <strong>Name:</strong> {{ user.name }}
            </div>
            <div class="mb-3">
               <strong>Email:</strong> {{ user.email }}
            </div>
            <div class="mb-3">
               <strong>Phone:</strong> {{ user.phone }}
            </div>
            <div class="mb-3">
               <strong>Address:</strong> {{ user.address }}
            </div>

            <div>
               <router-link :to="{name: 'user.edit', params:{userId: user.id }}" class="btn btn-sm btn-primary mr-1">Edit</router-link>
               <button @click="confirmDelete(user.id)" class="btn btn-sm btn-danger ms-1">Delete</button>
            </div>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter} from 'vue-router'

export default {
   setup() {
      const route = useRoute();
      const router = useRouter();
      const user = ref({
         name: '',
         email: '',
         phone: '',
         address: ''
      });

      onMounted(() => {
         const userId = route.params.id;
         axios.get(`http://127.0.0.1:8000/api/v1/get/user/${userId}`)
         .then(response => {
            const userData = response.data.data;
            user.value = userData;
         })
         .catch(error => {
            console.log(error.response.data);
         });
      });

      const deleteUser = (id) => {
         axios
         .delete(`http://127.0.0.1:8000/api/v1/delete/user/${id}`)
         .then(() => {
            router.push('/');
         })
         .catch((err) => {
            console.error(err.response.data);
         });
      };

      const confirmDelete = (id) => {
         if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(id);
         }
      };

      return {
         user,
         confirmDelete
      };
  }
}
</script>

<style>
body {
    background: lightgray;
}
</style>
