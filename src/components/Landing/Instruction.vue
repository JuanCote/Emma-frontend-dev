<script>

export default {
    methods: {
        async copyCode() {
            const myText = '<script src="https://supportbackend/get_js/{identifier}"><\/script>'
            await navigator.clipboard.writeText(myText)
            alert('Copied')
        }
    }
}
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
    <div class="instruction-container">
        <h1 class="instruction-h1">Installation instructions</h1>
        <div class="instruction-content">
            <h2 class="instruction-content-h2">First, you need to <a class="instruction-register-a" href="https://app.olark.com/signup/account">register</a> on the Olark platform and add their chatbot to your website code. Once you are logged in, click on the Settings section from the menu on the left and then click Installation. Follow the manual installation guide provided by Olark and follow the <span>manual installation guide.</span> Here is the <a class="instruction-register-a" href="https://www.olark.com/install?id=7118-657-10-8174">helpful instruction</a> from Olark.</h2>
            <h2 class="instruction-from-olark">After installing Olark on your page, you will already have a working bot, but it does not yet interact with Neuroshop.</h2>
            <p class="instruction-content-p">
Now, after the Olark code (which you inserted before the &lt;/body&gt; tag), you should add the connection to our logic, which will handle customer interactions for you. Add this part of the code before &lt;/body&gt; (after the Olark code), and <span>don't forget to specify your identifier in the highlighted place.</span></p>
            <div class="instruction-jscode-button">
                <button @click="copyCode" class="copy-button">Copy</button>
            <pre class="instruction-pre">
                <code class="instruction-code">
&lt;script src="https://supportbackend/get_js/{<span>identifier</span>}"&gt;&lt;/script&gt;
                </code>
            </pre>
            </div>
            <p class="instruction-content-p">After all manipulations, the code of your page should look something like this.</p>
            <img src="@/assets/images/code-example.png">
            <p class="instruction-content-p-ready">Ready! Now the EMMA assistant will automatically respond to customers' messages.</p>
    </div>
    </div>
</template>

<style>
    .instruction-jscode-button {
        display: flex;
        flex-direction: column;
        max-width: fit-content;
        position: relative;
    }
    .copy-button:hover {
        cursor: pointer;
    }
    .copy-button {
        width: 60px;
        position: absolute;
        right: 12px;
        top: 12px;
        font-weight: 500;
        background: linear-gradient(to top right, rgba(117, 112, 255, 0.2), rgba(188, 112, 255, 0.22));
        border: none;
        align-self: flex-end;
        height: 30px;
        border-radius: 24px;
        color: white;
        margin-bottom: 5px;
    }
    .instruction-content-p-ready {
        margin-bottom: 10px;
        font-size: 18px;
        margin-top: 20px;
        line-height: 1.5;
    }
    .instruction-pre span {
        color: #e33b43;
    }
    .instruction-pre {
        border: 10px solid #e7e2ff;
        font-size: 18px;
        display: flex;
        align-items: center;
        max-width: fit-content;
    }
    .instruction-content-h2 span {
        font-weight: 500;
    }
    .instruction-from-olark {
        margin-top: 30px;
        font-size: 20px;
        font-weight: 500;
    }
    .instruction-content-p span {
        font-weight: 500;
    }
    .instruction-content-p {
        margin-bottom: 10px;
        font-size: 18px;
        margin-top: 10px;
        line-height: 1.5;
    }
    .instruction-register-a {
        color: #003df1;
    }
    .instruction-container {
        width: 1220px;
        margin: auto;
    }
    .instruction-h1 {
        text-align: center;
        font-size: 52px;
        font-weight: 700;
    }
    .instruction-content {
        margin-top: 80px;
    }
    .instruction-content-h2 {
        font-size: 20px;
        font-weight: 400;
        line-height: 1.5;
    }
</style>