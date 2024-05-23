<script>
import { BACKEND_URL } from '@/config.js'

export default {
    data() {
        return {
        }
    },
    components: {
        
    },
    methods: {
        callback(response) {
            // Получение токена из ответа
            const access_token = response.credential;
            fetch(`${BACKEND_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ access_token }),
                credentials: 'include'
            })
            .then(response => {
                if (response.ok) {
                    this.$router.push('/emma/chats')
                } else {
                    throw new Error('Ошибка HTTP: ' + response.status);
                }
            })
            .catch(error => {
                // Обработка ошибки
                console.error('Ошибка при обработке ответа:', error);
            });
        }

    },
    mounted() {
        fetch(`${BACKEND_URL}/check_user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                this.$router.push('/emma/analytic')
            } else {
                throw new Error('Ошибка HTTP: ' + response.status);
            }
        })
    }
}
</script>

<template>
    <div class="auth-background">
        <div class="auth-container">
            <div class="auth-header">
                <img src="@/assets/images/logo.jpg">
                <h1>EMMA</h1>
            </div>
            <div class="auth-google-container">
                <GoogleLogin class="auth-google" :callback="callback"></GoogleLogin>
            </div>
        </div>
    </div>
</template>

<style>
    .auth-google-container {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }
    .auth-google {
        
    }
    .auth-header h1 {
        font-weight: 600;
        font-size: 23px;
        margin-top: 4px;
    }
    .auth-header {
        display: flex;
        justify-content: center;
        padding-top: 24px;
        gap: 9px;
    }
    .auth-background {
        background: #f0f3fa;
        min-height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .auth-container {
        margin-top: -40px;
        border-radius: 8px;
        background: white;
        height: 320px;
        width: 400px;
        border: 1px solid #d2b7ff;
    }
</style>
