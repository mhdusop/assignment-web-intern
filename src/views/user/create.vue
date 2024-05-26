<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>Create User</h4>
            <hr>
            <form @submit.prevent="store">
              <div class="form-group mt-3">
                <label for="name" class="fw-semibold">Name</label>
                <input type="text" class="form-control" v-model="user.name" placeholder="Enter Name" required>
              </div>
              <div class="form-group mt-3">
                <label for="email" class="fw-semibold">Email</label>
                <input type="email" class="form-control" v-model="user.email" placeholder="Enter Email" required>
              </div>
              <div class="form-group mt-3">
                <label for="phone" class="fw-semibold">Phone</label>
                <input type="text" class="form-control" v-model="user.phone" placeholder="Enter Phone">
              </div>
              <div class="form-group mt-3">
                <label for="address" class="fw-semibold">Address</label>
                <textarea class="form-control" v-model="user.address" placeholder="Enter Address"></textarea>
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
import { useRouter } from 'vue-router'
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

    function store() {

      validation.value = [];

      // Validation rules
		if (!user.name.trim()) {
			validation.value.push('Name is required');
		}
		if (!/^[a-zA-Z\s]+$/.test(user.name.trim())) {
			validation.value.push('Name must contain alphabets only');
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
		if (!/^[a-zA-Z0-9\s]+$/.test(user.address.trim())) {
			validation.value.push('Address must be alphanumeric');
		}

		if (validation.value.length > 0) {
			return;
		}

		axios.post('http://localhost:8000/api/v1/create/user', user)
			.then(() => {
				alert('User created!')
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
      store
    };
  }
}
</script>


<style scoped>
body {
  background: lightgray;
}
</style>
