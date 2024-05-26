<template>
   <div class="container mt-5">
      <div class="row">
         <div class="col-md-12">
            <div class="card border-0 rounded shadow">
               <div class="card-body">
                  <h4>Data Users</h4>
                  <hr />
                  <div class="d-flex justify-content-between">
                     <div class="col-6">
                        <router-link
                           to="/user/create"
                           class="btn btn-md btn-success"
                           >Add User</router-link
                           >
                     </div>
                     <div class="col-6">
                        <input
                           type="text"
                           class="form-control"
                           placeholder="Search..."
                           v-model="searchTerm"
                           @keyup="search"
                           />
                     </div>
                  </div>
                  <div v-if="loading" class="text-center mt-4">
                     <p>Loading...</p>
                  </div>
                  <div v-if="error" class="alert alert-danger mt-4">
                     <p>{{ error }}</p>
                  </div>
                  <table
                     v-if="!loading && !error"
                     class="table table-hover table-bordered mt-4"
                     >
                     <thead class="thead-dark">
                        <tr>
                           <th scope="col">ID</th>
                           <th scope="col">Name</th>
                           <th scope="col">Email</th>
                           <th scope="col">Phone</th>
                           <th scope="col">Address</th>
                           <th scope="col">Created At</th>
                           <th scope="col">Updated At</th>
                           <th scope="col">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr
                           v-for="(user, index) in filteredUsers"
                           :key="index"
                           >
                           <td>{{ index + 1 }}</td>
                           <td>{{ user.name }}</td>
                           <td>{{ user.email }}</td>
                           <td>{{ user.phone }}</td>
                           <td>{{ user.address }}</td>
                           <td>{{ formatDate(user.created_at) }}</td>
                           <td>{{ formatDate(user.updated_at) }}</td>
                           <td
                              class="d-flex justify-content-center gap-1"
                              >
                              <router-link
                                 :to="{name: 'user.detail', params:{id: user.id }}"
                                 class="btn btn-sm btn-warning mr-1"
                                 >Detail</router-link
                                 >
                              <router-link
                                 :to="{name: 'user.edit', params:{id: user.id }}"
                                 class="btn btn-sm btn-primary mr-1"
                                 >Edit</router-link
                                 >
                              <button
                                 @click="confirmDelete(user.id)"
                                 class="btn btn-sm btn-danger ml-1"
                                 >
                              Delete
                              </button>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div class="d-flex justify-content-end">
                  <!-- Pagination -->
                  <div class="row justify-content-center mt-2 me-2">
                     <nav aria-label="Page navigation">
                        <ul class="pagination">
                           <li
                              class="page-item"
                              :class="{ disabled: currentPage === 1 }"
                              >
                              <a
                                 class="page-link"
                                 href="#"
                                 @click.prevent="prevPage"
                                 ><</a
                                 >
                           </li>
                           <li
                              class="page-item"
                              v-for="page in totalPages"
                              :key="page"
                              :class="{ active: page === currentPage }"
                              >
                              <a
                                 class="page-link"
                                 href="#"
                                 @click.prevent="gotoPage(page)"
                                 >{{ page }}</a
                                 >
                           </li>
                           <li
                              class="page-item"
                              :class="{ disabled: currentPage === totalPages }"
                              >
                              <a
                                 class="page-link"
                                 href="#"
                                 @click.prevent="nextPage"
                                 >></a
                                 >
                           </li>
                        </ul>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
   import axios from 'axios';
   import { onMounted, ref, computed } from 'vue';
   
   export default {
     name: 'Users',
     setup() {
       const users = ref([]);
       const loading = ref(true);
       const error = ref(null);
       const currentPage = ref(1);
       const totalPages = ref(1);
       const searchTerm = ref('');
   
      const fetchUsers = () => {
         loading.value = true;
         axios
         .get(`http://127.0.0.1:8000/api/v1/get/users`, {
            params: {
               page: currentPage.value,
               search: searchTerm.value,
            },
         })
         .then((response) => {
            users.value = response.data.data.data;
            totalPages.value = response.data.data.last_page;
         })
         .catch((err) => {
            error.value = err.response ? err.response.data : 'An error occurred';
         })
         .finally(() => {
            loading.value = false;
         });
      };
   
       onMounted(fetchUsers);
   
       const deleteUser = (id) => {
         axios
           .delete(`http://127.0.0.1:8000/api/v1/delete/user/${id}`)
           .then(() => {
             fetchUsers();
           })
           .catch((err) => {
             console.error(err.response.data);
           });
       };
   
       const filteredUsers = computed(() => {
           return users.value.filter(user => {
               return user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                       user.phone.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                       user.address.toLowerCase().includes(searchTerm.value.toLowerCase());
           });
       });
   
       const formatDate = (dateString) => {
         const options = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
         return new Date(dateString).toLocaleString('en-GB', options);
       };
   
       const confirmDelete = (id) => {
         if (window.confirm('Are you sure you want to delete this user?')) {
           deleteUser(id);
         }
       };
   
       const prevPage = () => {
         if (currentPage.value > 1) {
           currentPage.value--;
           fetchUsers();
         }
       };
   
       const nextPage = () => {
         if (currentPage.value < totalPages.value) {
           currentPage.value++;
           fetchUsers();
         }
       };
   
       const gotoPage = (page) => {
         currentPage.value = page;
         fetchUsers();
       };
   
       const search = () => {
           currentPage.value = 1;
           fetchUsers();
       };
   
       return {
         users,
         loading,
         error,
         confirmDelete,
         formatDate,
         currentPage,
         totalPages,
         searchTerm,
         prevPage,
         nextPage,
         gotoPage,
         filteredUsers,
         search,
       };
     },
   };
</script>
<style scoped>
   body {
   background: lightgray;
   }
</style>