<template>
    <div>
        <header-nav></header-nav>
        <div class="container" id="detail">
            <el-row  :gutter="30">
                <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
                    <aboutMe></aboutMe>
                </el-col>
                <el-col :sm="24"  :md="8" >
                    <rightList></rightList>
                </el-col>
            </el-row>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import header from '@/components/header';
    import footer from "@/components/footer";
    import rightList from "@/components/rightList";
    import aboutMe from "@/components/aboutMe";
    export default {
        name: "AboutMe",
        components: {
            'header-nav': header,
            'footer-nav': footer,
            'rightList': rightList,
            'aboutMe': aboutMe
        },
        mounted() {
            let anchor = document.querySelector('#detail');
            let top = anchor.offsetTop-60;
            document.body.scrollTop = top;
            //firefox
            document.documentElement.scrollTop = top;
            //safari
            window.pageYOffset = top;
        }
    }
</script>

<style scoped>

</style>