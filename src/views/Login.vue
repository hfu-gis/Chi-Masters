<template>
    <div id="Login-Screen" role="main">
        <h1>{{msg}}</h1>
        <input id="email" type="email" :placeholder="mail">
        <input id="password" type="password" :placeholder="pw">
        <button id="submit">{{submit}}</button>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data: function () {
            return {
                msg: 'Login to your account or create a new one',
                mail: 'Please type in your email',
                pw: 'Please type in your password',
                submit: 'Einloggen'
            }
        }
    }
</script>

<style scoped>
    #Login-Screen {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 80vh;
    }
</style>