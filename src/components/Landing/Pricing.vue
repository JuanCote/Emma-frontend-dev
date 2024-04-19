<script>

</script>

<template>
    <div>
        <div class="pricing-main">
            <h1 class="pricing-h1">PRICING PLANS</h1>
            <div class="prices">
                <div class="price-type">
                    <h2 class="price-name">START</h2>
                    <ul class="price-ul"> 
                        <li><img src="@/assets/images/done.png"><p>Initial setup by user</p></li>
                        <li><img src="@/assets/images/done.png"><p>Up to 40 algorithms</p></li>
                        <li><img src="@/assets/images/close.png"><p class="off">Connecting to your back-end data via API</p></li>
                        <li><img src="@/assets/images/close.png"><p class="off">Connecting via API to your front-end solution</p></li>
                        <li><img src="@/assets/images/close.png"><p class="off">Fully autonomous mode</p></li>
                        <li><img src="@/assets/images/done.png"><p>200 Messages/month</p></li>
                    </ul>
                    <h2 class="price">Free</h2>
                </div>
                <div class="price-type">
                    <h2 class="price-name">PRO</h2>
                    <ul class="price-ul"> 
                        <li><img src="@/assets/images/done-color.png"><p>Initial setup with our assistance</p></li>
                        <li><img src="@/assets/images/done-color.png"><p>Up to 200 algorithms</p></li>
                        <li><img src="@/assets/images/done-color.png"><p>Connecting to your back-end data via API</p></li>
                        <li><img src="@/assets/images/done-color.png"><p>Connecting via API to your front-end solution</p></li>
                        <li><img src="@/assets/images/done-color.png"><p>Fully autonomous mode</p></li>
                        <li><img src="@/assets/images/done-color.png"><p>10,000 Messages/month</p></li>
                    </ul>
                    <h2 class="price">99$/month</h2>
                </div>
                <div class="price-type">
                    <h2 class="price-name enterprice">ENTERPRICE</h2>
                    <ul class="price-ul"> 
                        <li><img src="@/assets/images/done-color.png"><p>Initial setup by us</p></li>
                        <li><img src="@/assets/images/done-color.png"><p>Up to 1000 algorithms</p></li>
                        <li><img src="@/assets/images/done-color.png"><p>Connecting to your back-end data via API</p></li>
                        <li><img src="@/assets/images/done-color.png"><p>Connecting via API to your front-end solution</p></li>
                        <li><img src="@/assets/images/done-color.png"><p>Fully autonomous mode</p></li>
                        <li><img src="@/assets/images/all_inclusive.png"><p>Unlimited Messages/month</p></li>
                    </ul>
                    <h2 class="price">Individual</h2>
                </div>
            </div>
            <div class="demo-block">
                <div class="demo-block-part first">
                    <p class="demo-p">Experience Emma's capabilities firsthand. Book a personalised demo today</p>
                    <button>Request a Demo</button>
                </div>
                <div class="demo-block-part">
                    <button>Contact Sales</button>
                    <p class="demo-p">Ready to transform your customer support? Talk to our sales team to start support automation</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .pricing-main {
        padding: 160px 0 0 0;
        width: 1220px;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .pricing-h1 {
        font-size: 48px;
        font-weight: 700;
    }
    .prices {
        margin-top: 80px;
        display: flex;
        gap: 16px;
        border-radius: 56px;
        padding: 16px;
        background: linear-gradient(to top right, rgba(117, 112, 255, 0.2), rgba(188, 112, 255, 0.22));
    }
    .price-type {
        width: 385px;
        border-radius: 40px;
        background-color: white;
    }
    .price-name {
        border-bottom: 2px solid rgba(31, 31, 41, 0.12);
        padding: 48px 10px 48px 10px;
        font-size: 32px;
        font-weight: 600;
        text-align: center;
    }
    .price {
        margin-top: 32px;
        background-image: linear-gradient(to right, rgba(31, 31, 41, 0.15) 33%, rgba(255, 255, 255, 0.15) 0%);
        background-position: top;
        background-size: 61px 1px;
        background-repeat: repeat-x;
        padding: 48px 10px 48px 10px;
        font-size: 32px;
        font-weight: 600;
        text-align: center;
    }
    .price-name.enterprice {
        background: linear-gradient(to right, #7570FF, #BC70FF);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
    .price-ul {
        display: flex;
        flex-direction: column;
        padding: 0 48px 0 48px;
        gap: 32px;
        margin-top: 32px;
        list-style: none;
    }
    .price-ul li {
        display: flex;
        font-weight: 500;
        align-items: center;
        gap: 8px;
    }
    .price-ul li p {
        padding-top: 5px;
    }
    .price-ul li p.off {
        opacity: 33%;
    }
    .demo-block {
        margin-bottom: 140px;
        margin-top: 16px;
        display: flex;
        width: 100%;
        align-items: center;
        border-radius: 56px;
        padding: 0px 41px 0px 41px;
        background: linear-gradient(to top right, rgba(117, 112, 255, 0.2), rgba(188, 112, 255, 0.22));
    }
    .demo-block-part {
        display: flex;
        width: 50%;
        align-items: center;
        padding: 24px 16.5px;
        justify-content: space-between;
    }
    .demo-block-part.first {
        border-right: 1px solid rgba(31, 31, 41, 0.2);
    }
    .demo-p {
        color: #835cff;
        width: 240px;
        font-size: 15px;
    }
    .demo-block-part button {
        width: 240px;
        height: 94px;
        border-radius: 24px;
        background-color: white;
        border: none;
        font-weight: 600;
        font-size: 20px;
        -webkit-box-shadow: 0px 5px 20px -10px rgba(114,141,254,0.76);
-moz-box-shadow: 0px 5px 20px -10px rgba(114,141,254,0.76);
box-shadow: 0px 5px 20px -10px rgba(114,141,254,0.76);

    }
</style>