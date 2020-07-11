<template>
    <footer class="footer-container">
        <div style="margin-bottom: 15vw">
            <div class="footer-title">
                <h2 class="title">ABOUT ME</h2>
            </div>
            <div class="">
                <p>电子科技大学在读研究生，热爱coding，希望以后可以从事前端方向的工作</p>
            </div>
            <div class="footer-title">
                <h2 class="title">CONTACT ME</h2>
            </div>
            <div class="">
                <p>Gmail: wendd0618@gmail.com</p>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "aboutMe"
    }
</script>

<style scoped>
    .footer-container{
        max-width: 768px;
        margin-top: 20px;
        position: relative;
        background: #fff;
        padding:15px;
        border-radius: 5px;
    }
    .footer-title{
        margin-bottom: 3vw;
        clear: both;
        overflow: hidden;
    }
    h2{
        float: left;
        text-align: left;
        font-weight: 300;
        text-transform: uppercase;
        letter-spacing: 0.3rem;
        font-size: 1em;
        margin: 0;
        color: rgba(51, 51, 79, 0.5);
    }
    p {
        color: rgba(51, 51, 79, 0.5);
        margin: 2vw;
        padding: 0;
        font-size: 1em;
    }
</style>
