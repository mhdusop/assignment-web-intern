<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Edit User</h4>
                        <hr>
                        <form @submit.prevent="update">
                            <div class="form-group mt-3">
                                <label for="name" class="fw-bold">Name</label>
                                <input type="text" class="form-control" v-model="user.name" placeholder="Enter Name">
                            </div>
                            <div class="form-group mt-3">
                                <label for="email" class="fw-bold">Email</label>
                                <input type="email" class="form-control" v-model="user.email" placeholder="Enter Email">
                            </div>
                            <div class="form-group mt-3">
                                <label for="phone" class="fw-bold">Phone</label>
                                <input type="tel" class="form-control" v-model="user.phone" placeholder="Enter Phone">
                            </div>
                            <div class="form-group mt-3">
                                <label for="address" class="fw-bold">Address</label>
                                <input type="text" class="form-control" v-model="user.address" placeholder="Enter Address">
                            </div>

                            <button type="submit" class="btn btn-primary mt-3">Save</button>
                        </form>

                        <div v-if="validation.length" class="mt-2 alert alert-danger">
                            <ul>
                                <li v-for="(error, index) in validation" :key="index">{{ error }}</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        const user = reactive({
            name: '',
            email: '',
            phone: '',
            address: ''
        });

        const validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        // Fetch user data on component mount
        axios.get(`http://localhost:8000/api/v1/get/user/${route.params.id}`)
            .then(response => {
                Object.assign(user, response.data.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });

        function update() {

            validation.value = [];

            // Validation rules
            if (!user.name.trim()) {
                validation.value.push('Name is required');
            }
            if (!user.email.trim()) {
                validation.value.push('Email is required');
            }
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email.trim())) {
                validation.value.push('Invalid email format');
            }
            if (!user.phone.trim()) {
                validation.value.push('Phone is required');
            }
            if (!/^\d+$/.test(user.phone.trim())) {
                validation.value.push('Phone must contain only numeric characters');
            }
            if (!user.address.trim()) {
                validation.value.push('Address is required');
            }

            if (validation.value.length > 0) {
                return;
            }

            // Update user data
            axios.post(`http://localhost:8000/api/v1/update/user/${route.params.id}`, user)
                .then(() => {
				    alert('User updated!')
                    router.push({ name: 'user.index' }); 
                })
                .catch(error => {
                    validation.value = error.response.data.errors || ['An error occurred'];
                });
        }

        return {
            user,
            validation,
            router,
            update
        };
    }
}
</script>

<style>
    body{
        background: lightgray;
    }
</style>
