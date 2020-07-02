<template>
    <div>
        <header-nav></header-nav>
        <div class="container" id="detail">
            <el-row :gutter="30">
                <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
                    <articleDetail></articleDetail>
                    <comment></comment>
                </el-col>
                <el-col :sm="24" :md="8">
                    <rightList></rightList>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import header from '../components/header'
    import articleDetail from "@/components/articleDetail";
    import rightList from "@/components/rightList";
    import comment from "@/components/comment";
    export default {
        name: "ArticleDetail",
        data() {
            return {

            }
        },
        components: {
            'header-nav': header,
            'articleDetail': articleDetail,
            'rightList': rightList,
            'comment': comment
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
