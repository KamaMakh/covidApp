<template>
  <GridLayout rows="auto, auto, auto, auto" class="item-wrap">
    <Label row="0" :text="element.country" class="item-wrap__title" />
    <Label row="1" :text="getCasesText(element)" class="item-wrap__option" />
    <Label row="2" :text="getDeathText(element)" class="item-wrap__option" />
    <Label row="3" :text="getRecoverText(element)" class="item-wrap__option" />
  </GridLayout>
</template>

<script>
  export default {
    name: "listItemCountry",
    props: {
      element: {
        type: Object,
        required: true
      }
    },
    methods: {
      getCasesText(country) {
        return `Заражено: ${this.ins1000Sep(this.formatNum(country.cases))} | Сегодня: ${this.ins1000Sep(this.formatNum(country.todayCases))} | Активные: ${this.ins1000Sep(this.formatNum(country.active))}`;
      },
      getDeathText(country) {
        return `Умерло: ${this.ins1000Sep(this.formatNum(country.deaths))} | Сегодня: ${this.ins1000Sep(this.formatNum(country.todayDeaths))}`;
      },
      getRecoverText(country) {
        return `Выздоровело: ${this.ins1000Sep(this.formatNum(country.recovered))} | Критические: ${this.ins1000Sep(this.formatNum(country.critical))}`;
      },
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
    font-family: 'Open Sans', sans-serif !important;
    &__title {
      font-size: 24;
      color: #fff;
    }
    &__option {
      margin-top: 15px;
      font-size: 14px;
      color: #a0a0a0;
    }
  }
</style>