// import axios from 'axios'

//公共路径
// let portUrl = "";

//文章分类查询
const ArtCassData = () =>{

}
const initTimeDate = (oldDate, full) =>{
    let newDate = new Date(oldDate);//oldDate '2014-04-23 18:55:49:123'
    let year = newDate.getFullYear();
    let month = newDate.getMonth()<9 ? '0'+(newDate.getMonth()+1) : newDate.getMonth()+1;
    let date = newDate.getDate()<10 ? '0'+(newDate.getDate()) : newDate.getDate();
    if(full === 'all'){
        let time = oldDate.split(' ')[0];
        return time.split('-')[0]+'年'+time.split('-')[1]+'月'+time.split('-')[2]+'日';
    }
    else if(full === 'year'){
        return year;
    }
    else if(full === 'month'){
        return month;
    }
    else if(full === 'Date'){
        return date;
    }
    else if(full === 'newDate'){
        return year+'年'+month+'月'+date+'日';
    }
}
const getArticleInfo = () => {

}

    export {
        initTimeDate,
        ArtCassData,
        getArticleInfo
    }