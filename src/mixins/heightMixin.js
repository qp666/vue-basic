export const heightMixin  = {
    data(){
        return {
            tableHeight:500
        }
    },
    mounted() {
        var contentHeight = document.querySelector(".view-content").offsetHeight;//主体内容高度
        var extHeight = document.querySelector(".page-searchbar").offsetHeight + 10 + 20 + 40 + 40;//附加高度，包括版权、分页、搜索栏、间距
        this.tableHeight = contentHeight - extHeight;
        this.$forceUpdate();
    },
}