<template>
    <div>
        <header-nav></header-nav>
        <div class="container">
            <el-row  :gutter="30">
                <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
                    <articleList></articleList>
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
    import header from '@/components/header'
    import footer from "@/components/footer";
    import articleList from "@/components/articleList";
    import rightList from "@/components/rightList";
    export default {
        name: "ArticleList",
        data() {
            return{

            }
        },
        components: {
            'header-nav': header,
            'footer-nav': footer,
            'rightList': rightList,
            'articleList': articleList
        }
    }
</script>

<style scoped>

</style>
