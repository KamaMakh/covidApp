<template>
  <GridLayout rows="auto, auto, auto" class="item-wrap">
    <Label row="0" :text="element.title ? element.title : '...'" class="item-wrap__title" />
    <Label row="1" :text="element.subTitle ? element.subTitle : '...'" class="item-wrap__subTitle" />
    <Label row="2" :text="element.count ? ins1000Sep(formatNum(element.count)) : '...'" class="item-wrap__count" />
  </GridLayout>
</template>

<script>
  export default {
    name: "listItem",
    props: {
      element: {
        type: Object,
        default: {
          title: "...",
          subTitle: "...",
          count: "..."
        }
      }
    },
    methods: {
      ins1000Sep(val){
        val = val.split(".");
        val[0] = val[0].split("").reverse().join("");
        val[0] = val[0].replace(/(\d{3})/g,"$1,");
        val[0] = val[0].split("").reverse().join("");
        val[0] = val[0].indexOf(",")==0?val[0].substring(1):val[0];
        return val[0];
      },
      formatNum(val){
        val = Math.round(val*100)/100;
        val = (""+val).indexOf(".")>-1 ? val + "00" : val + ".00";
        var dec = val.indexOf(".");
        return dec == val.length-3 || dec == 0 ? val : val.substring(0,dec+3);
      }
    }
  }
</script>

<style scoped lang="scss">
  .item-wrap {
    background: rgba(#fff, 0.1);
    color: #949494;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 15;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 4px;
    &__title {
      font-size: 16px;
      color: #949494;
      font-family: 'Open Sans', sans-serif;
    }
    &__subTitle {
      margin-top: 10px;
      font-size: 20px;
      color: #dbdbdb;
      font-family: 'Open Sans', sans-serif;
      font-weight: 600;
    }
    &__count {
      margin-top: 15px;
      font-size: 24px;
      color: #949494;
      font-family: 'Open Sans', sans-serif;
    }
  }
</style>