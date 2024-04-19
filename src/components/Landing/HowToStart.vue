<script>

</script>

<template>
    <div class="howtostart-body">
        <div class="howtostart-main">
            <h1 class="howtostart-h1">HOW TO START</h1>
            <div class="tips-blocks">
                <div class="tips-block">
                    <div class="tips-block-img">
                        <img src="@/assets/images/tip-1.png">
                    </div>
                    <p class="tips-block-p">1. Algorithm Input: Provide Emma with your company's algorithms in plain text, detailing action and response patterns for varied scenarios or simply upload your support scripts. </p>
                </div>
                <div class="tips-block">
                    <div class="tips-block-img">
                        <img src="@/assets/images/tip-2.png">
                    </div>
                    <p class="tips-block-p">2. Database Connectivity: Offer us REST API endpoints, enabling Emma to connect and retrieve information from your databases. </p>
                </div>
                <div class="tips-block">
                    <div class="tips-block-img">
                        <img src="@/assets/images/tip-3.png">
                    </div>
                    <p class="tips-block-p">3. Personalise Communication: Adjust Emma's tone of voice and style to resonate with your brand's identity. </p>
                </div>
                <div class="tips-block">
                    <div class="tips-block-img">
                        <img src="@/assets/images/tip-4.png">
                    </div>
                    <p class="tips-block-p">4. Human Moderation Phase: For several initial weeks, we recommend semi-autonomous work, when Emma suggests answers for human review. Denied suggestions are used as learning opportunities, refining her responses. </p>
                </div>
            </div>
            <div class="tips-block-5">
                <div class="tips-block-img">
                    <img src="@/assets/images/tip-5.png">
                </div>
                <p class="tips-block-p">5. Autonomous Operation: Once satisfied with Emma's proficiency, switch her to fully autonomous mode, allowing direct communication with customers.</p>
            </div>
            <div class="support-block">
                <img class="support-block-img" src="@/assets/images/support-logo.png">
                <p class="support-block-p">Support: Our team is available to assist with the setup, ensuring a smooth transition and optimal performance</p>
            </div>
        </div>  
    </div>
</template>

<style>
    .howtostart-body {
        background-color: #1F1F29;
    }
    .howtostart-main {
        padding: 145px 0;
        width: 1220px;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .howtostart-h1 {
        font-weight: 700;
        font-size: 48px;
        color: white;
    }
    .tips-blocks {
        grid-template-columns: 1fr 1fr;
        margin-top: 80px;
        display: grid;
        gap: 16px;
        row-gap: 49px;
    }
    .tips-block-p {
        margin-top: 32px;
        color: white;
        font-weight: 300;
        font-size: 15px;
    }
    .tips-block-5 {
        margin-top: 48px;
    }
    .support-block {
        background-color: #3a3a43;
        width: 100%;
        border-radius: 40px;
        padding: 16px;
        display: flex;
        position: relative;
        height: 128px;
        margin-top: 64px;
        justify-content: center;
        align-items: center;
    }
    .support-block-img {
        position: absolute;
        left: 16px;
    }
    .support-block-p {
        font-weight: 500;
        font-size: 19px;
        color: white;
        width: 517px;
    }
</style>