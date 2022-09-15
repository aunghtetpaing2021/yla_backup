<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen">
        <div class="grid justify-content-center p-2 lg:p-0 col-8">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <!-- <img src="../../../assets/images/logo.png" alt="Yoma Land" title="Yoma Land" class="logo" /> -->
            </div>

            <div class="col-12 xl:col-6 gradient-border">
                <div class="h-full w-full m-0 py-7 px-4 gradient-fill">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, Yoma Land!</div>
                        <span class="text-600 font-medium">Admin Login</span>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <div class="input-group mb-3">
                            <label class="block text-900 text-xl font-medium mb-2"> Account Name </label>
                            <InputText v-model="identifier" type="text" class="w-full" placeholder="Eenter user account name" required="required" />
                        </div>

                        <div class="input-group mb-3">
                            <label class="block text-900 text-xl font-medium mb-2"> Password </label>
                            <InputText v-model="password" type="password" class="w-full" placeholder="Eenter password" required="required" />
                        </div>

                        <div class="input-group mb-3">
                            <div class="flex align-items-center justify-content-between">
                                <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <Button label="Login" class="w-full p-3 text-xl" @click="login"></button>
                            <small class="text-900 error" v-if="validation && validation.status"> {{validation.message}} </small>
                        </div>

                        <div class="input-group">
                            <span class="error"> {{ toastMessage }} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { loginService } from '../authService';
    import axios from "axios";

    export default {
        data() {
            
            return {
                identifier: '',
                password: '',
                validation: {
                    status: false,
                    message: null
                },
                toastMessage: null,
            }
        },

        methods: {
            async login() {
                if(this.identifier === '' || this.password === '') {
                    this.validation.message = "All fileds are required";
                    this.validation.status = true;
                    return;
                }

                const result = await loginService({identifier: this.identifier, password : this.password});
                
                if(result.data) {
                    localStorage.setItem('token', result.data.access_token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access_token}`;
                    this.$router.push('/');
                    return;
                }
                
                this.toastMessage = "Incorrect username and password";

                return;
            }
        },

        computed: { }
    }
</script>

<style scoped>
    .gradient-border {
        border-radius:56px; 
        padding:0.3rem; 
        background: linear-gradient(180deg, rgb(1, 114, 192), rgb(248, 151, 20) 30%);
    }
    .gradient-fill {
        border-radius:53px; 
        background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));
    }
</style>