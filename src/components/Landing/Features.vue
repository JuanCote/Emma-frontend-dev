<script>

</script>

<template>
    <div>
        <div class="main-div">
            <h1 class="main-h1">FEATURES</h1>
            <div class="features-block">
                <ul class="features-ul">
                    <li class="features-li-hover">
                        <h1 class="features-li-h1-hover">Instant Customer Support 24/7</h1>
                        <p class="features-li-p-hover">The solution is fully autonomous and capable to process lots of requests simultaneously any time of the day.</p>
                    </li>
                    <li class="features-li">
                        <h1 class="features-li-h1">Customizable Algorithms</h1>
                        <p class="features-li-p">Feed Emma with your company-specific algorithms to ensure she acts and responds precisely as you intend in varied scenarios.</p>
                    </li>
                    <li class="features-li">
                        <h1 class="features-li-h1">Database Integration</h1>
                        <p class="features-li-p">Emma seamlessly integrates with your company databases, fetching necessary information to resolve support cases.</p>
                    </li>
                    <li class="features-li">
                        <h1 class="features-li-h1">Dual Mode Operation</h1>
                        <p class="features-li-p">Choose between fully autonomous operations or human moderation. Emma can suggest answers to human agents or directly communicate with customers based on your preference.</p>
                    </li>
                </ul>
                <div class="features-squares">
                    <div class="features-square"></div>
                    <div class="features-square"></div>
                    <div class="features-square"></div>
                    <div class="features-square"></div>
                </div>
            </div>
            <h1 class="main-h1-2">BENEFITS</h1>
            <div class="benefits-blocks">
                <div class="benefits-block">
                    <div class="benefit-block-text">
                        <h1 class="benefits-block-h1">Consistent Support</h1>
                        <p class="benefits-block-p">Ensure uniformity in responses, maintaining your brand's voice and quality across all customer interactions.</p>
                    </div>
                    <div class="benefit-block-img">
                        <img src="@/assets/images/benefits-1.png"> 
                    </div>
                </div>
                <div class="benefits-block">
                    <div class="benefit-block-text">
                        <h1 class="benefits-block-h1">Scalability</h1>
                        <p class="benefits-block-p">Emma effortlessly handles high volumes of queries, ensuring no customer is left waiting.</p>
                    </div>
                    <div class="benefit-block-img">
                        <img src="@/assets/images/benefits-2.png"> 
                    </div>
                </div>
                <div class="benefits-block">
                    <div class="benefit-block-text">
                        <h1 class="benefits-block-h1">Efficiency</h1>
                        <p class="benefits-block-p">Reduce the time and resources spent on repetitive queries, allowing your human agents to focus on more complex tasks.</p>
                    </div>
                    <div class="benefit-block-img">
                        <img src="@/assets/images/benefits-3.png"> 
                    </div>
                </div>
                <div class="benefits-block">
                    <div class="benefit-block-text">
                        <h1 class="benefits-block-h1">Integration Flexibility</h1>
                        <p class="benefits-block-p">With REST API endpoints, integrate Emma's responses into any existing solution or platform.</p>
                    </div>
                    <div class="benefit-block-img">
                        <img src="@/assets/images/benefits-4.png"> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    body {
        margin: 0;
        padding: 0;
    }
    .main-div {
        width: 1220px;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 150px;
        padding-bottom: 159px;
    }
    .main-h1 {
        width: 241px;
        font-size: 48px;
        font-weight: 700;
    }
    .features-block {
        margin-top: 70px;
        gap: 72px;
        width: 100%;
        display: flex;
    }
    .features-ul {
        width: 555px;
        gap: 16px;
        display: flex;
        flex-direction: column;
        list-style: none;
    }
    .features-li {
        padding: 32px;
    }
    .features-li-h1 {
        font-weight: 500;
        font-size: 19px;
        margin-bottom: 10px;
    }
    .features-li-p {
        font-size: 14px;
        opacity: 50%;
    }
    .features-li-hover {
        border-radius: 24px;
        padding: 32px;
        background: linear-gradient(to top right, rgba(117, 112, 255, 0.2), rgba(188, 112, 255, 0.22));
    }
    .features-li-h1-hover {
        color: #4a39ff;
        font-weight: 500;
        font-size: 19px;
        margin-bottom: 10px;
    }
    .features-li-p-hover {
        font-size: 14px;
        opacity: 50%;
        color: #4a39ff;
    }
    .features-squares {
        width: 593px;
        display: grid;
        gap: 16px;
        grid-template-columns: 1fr 1fr; 
    }
    .features-square {
        border-radius: 40px;
        width: 288.5px;
        height: 288.5px;
        box-shadow: 0 5px 20px rgba(114, 141, 254, 0.2);
    }
    .main-h1-2 {
        width: 229px;
        font-size: 48px;
        font-weight: 700;
        margin-top: 160px;
    }
    .benefits-blocks {
        margin-top: 80px;
        background: linear-gradient(to top right, rgba(117, 112, 255, 0.2), rgba(188, 112, 255, 0.22));
        padding: 16px;
        border-radius: 56px;
        grid-template-columns: 1fr 1fr; 
        display: grid;
        gap: 16px;
        height: 632px;
        width: 100%;
    }
    .benefits-block {
        height: 292px;
        display: flex;
        justify-content: space-between;
        border-radius: 40px;
        background-color: white;
        padding: 55px;
        align-items: center;
    }
    .benefits-block-h1 {
        font-weight: 500;
        font-size: 19px;
        margin-bottom: 10px;
    }
    .benefits-block-p {
        font-size: 14px;
        opacity: 50%;
        width: 270px;
    }
</style>