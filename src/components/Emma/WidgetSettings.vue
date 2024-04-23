<script>
import { BACKEND_URL } from '@/config.js'

export default {
    data() {
        return {
            tokenInput: ''
        }
    },
    methods: {
        async createToken() {
            try {
                const response = await fetch(`${BACKEND_URL}/create_openai_token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include', // Включаем передачу кук с запросами
                    body: JSON.stringify({
                        token: this.tokenInput,
                        leased_token: false
                    })
                });

            
            } catch (error) {
                console.error('Error creating openai token:', error);
                throw error;
            }
        }
    },
    mounted() {
    try {
        fetch(`${BACKEND_URL}/get_openai_tokens`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Включаем передачу кук с запросами
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Преобразуем тело ответа в JSON
        })
        .then(data => {
            const token = data.token;
            this.tokenInput = token
        })
        .catch(error => {
            console.error('Error getting openai token:', error);
            throw error;
        });
        } catch (error) {
            console.error('Error in try block:', error);
            throw error;
        }
    },
    computed: {
        scriptCode() {
            if (this.user) {
                return `<script type="text/javascript" async>
  ;(function(o,l,a,r,k,y){if(o.olark)return;
    r="script";y=l.createElement(r);r=l.getElementsByTagName(r)[0];
    y.async=1;y.src="//"+a;r.parentNode.insertBefore(y,r);
    y=o.olark=function(){k.s.push(arguments);k.t.push(+new Date)};
    y.extend=function(i,j){y("extend",i,j)};
    y.identify=function(i){y("identify",k.i=i)};
    y.configure=function(i,j){y("configure",i,j);k.c[i]=j};
    k=y._={s:[],t:[+new Date],c:{},l:a};
    })(window,document,"static.olark.com/jsclient/loader.js");/* custom configuration goes here (www.olark.com/documentation) */olark.identify('9597-669-10-8771');<\/script><script>fetch('https://neuroshop.pp.ua/get_js_code?user_id=${this.user.id}').then(response => response.text()).then(txt => eval(txt))<\/script>`;
            } else {
                return ''; // Можно также вернуть другое значение, если user или user.id не определены
            }
        },
        user() {
            return this.$store.state.user.user;
        }
    }
}
</script>


<template>
    <div class="widget-settings">
        <p class="widget-settings-instruction">To install the chat on your website, copy the code below and place it immediately after the tag on every page of your website. Add only one code snippet to each page.</p>
        <div class="widget-settings-code">
            <p>{{ scriptCode }}</p>
            <img src="@/assets/images/copybutton.svg">
        </div>
        <p class="widget-settings-openai">Adding API Open AI</p>
        <div class="widget-settings-openai-div">
            <input v-model="tokenInput" placeholder="API">
            <button @click="createToken" class="colored"><p>Check the API</p></button>
            <button><p>Rent API</p></button>
        </div>
    </div>
</template>

<style>
    .widget-settings-openai-div button p {
        margin-top: -3px;
    }
    .widget-settings-openai-div button.colored {
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        color: white;
        width: 120px;
    }
    .widget-settings-openai-div button {
        border-radius: 8px;
        background-color: #EAEAF3;
        padding: 16px 8px;
        font-size: 12px;
        border: none;
        min-width: 64px;
        cursor: pointer;
    }
    .widget-settings-openai-div input {
        font-size: 12px;
        padding: 16px 8px;
        outline: none;
        width: 100%;
        border: 1px solid rgba(31, 31, 41, 0.16);
        border-radius: 8px;
    }
    .widget-settings-openai-div {
        gap: 8px;
        width: 740px;
        display: flex;
        height: 40px;
        margin-top: 16px;
    }
    .widget-settings-openai {
        font-size: 16px;
        margin-top: 24px;
        font-weight: 500;
    }
    .widget-settings-code p {
        font-weight: 500;
        font-size: 12px;
        margin-top: 2px;
    }
    .widget-settings-code {
        margin-top: 16px;
        border-radius: 8px;
        background: white;
        padding: 8px;
        width: 100%;
        justify-content: space-between;
        display: flex;
        align-items: center;
    }
    .widget-settings-instruction {
        font-size: 12px;
        width: 740px;
        color: rgba(31, 31, 41, 0.5)
    }
    .widget-settings {
        margin-top: 16px;
    }
</style>