<template>
    <Page class="page">
        <ActionBar class="header" :title="activeTabIndex == 0 ? 'Статистика по всему миру': 'Статистика по странам'" borderBottomWidth="1" borderBottomColor="#949494" />
        <BottomNavigation :selectedIndex="activeTabIndex" @selectedIndexChange="onTabChange" class="layout">
            <TabStrip>
                <TabStripItem class="tabstripitem">
                    <Label class="navigation-btn" text="Мир"></Label>
                    <Image src="~/assets/images/earth.png" />
                </TabStripItem>
                <TabStripItem class="tabstripitem">
                    <Label text="Страны"></Label>
                    <Image src="~/assets/images/flag.png" />
                </TabStripItem>
            </TabStrip>

            <TabContentItem>
                <GridLayout v-if="global && global.cases" rows="auto, auto, auto, auto" class="body-wrap">
                    <Label class="date" row="0" :text="formatDate()" />
                    <listItem row="1" :element="{subTitle: 'Зараженные', title: 'Мир', count: global.cases}" />
                    <listItem row="2" :element="{subTitle: 'Летальные исходы', title: 'Мир', count: global.deaths}" />
                    <listItem row="3" :element="{subTitle: 'Выздоровевшие', title: 'Мир', count: global.recovered}" />
                </GridLayout>
            </TabContentItem>

            <TabContentItem>
                <GridLayout rows="auto, *" class="body-wrap">
                    <SearchBar @loaded="searchbarLoaded" row="0" hint="Поиск" textFieldHintColor="#f5f5f5" class="search" :text="searchPhrase" @textChange="onTextChanged" @clear="clearSearch" @submit="onSubmit" />
                    <ListView row="1" for="country in localCountries">
                        <v-template>
                            <listItemCountry :element="country" />
                        </v-template>
                    </ListView>
                </GridLayout>
            </TabContentItem>
        </BottomNavigation>
    </Page>
</template>

<script>
    import { mapState } from "vuex";
    import listItem from "./common/listItem";
    import listItemCountry from "./common/listItemCountry";
    import {ad} from "tns-core-modules/utils/utils";
    const platform = require("tns-core-modules/platform");
    const frame = require("tns-core-modules/ui/frame");

    export default {
        name: "AppContainer",
        components: {
            listItem,
            listItemCountry
        },
        data() {
            return {
                activeTabIndex: 0,
                searchPhrase: "",
                searchEnabled: false,
                localCountries: []
            };
        },
        computed: {
            ...mapState({
                global: state => state.stats.global,
                countries: state => state.stats.countries
            })
        },
        methods: {
            onTabChange(tab) {
                this.activeTabIndex = tab.value;
                if (tab.value === 1) {
                    setTimeout(() => {
                        if (!this.countries.length || this.$store.state.stats.firstOpen) {
                            this.$store.dispatch("stats/getCountries");
                            this.localCountries = this.countries;
                        } else if (!this.searchPhrase.length) {
                            this.localCountries = this.countries;
                        }

                        if (this.$store.state.stats.firstOpen) {
                            this.$store.state.stats.firstOpen = false;
                        }
                    }, 150);
                }
            },
            formatDate() {
                let d = new Date(),
                  month = "" + (d.getMonth() + 1),
                  day = "" + d.getDate(),
                  year = d.getFullYear();

                if (month.length < 2) month = "0" + month;
                if (day.length < 2) day = "0" + day;

                return [day, month, year].join(".");
            },
            onTextChanged(data) {
                this.searchPhrase = data.value;
                if (data.value.length) {
                    let result = this.countries.filter(country => {
                        return country.country && country.country.toLowerCase().indexOf(data.value.toLowerCase()) > -1;
                    });
                    this.localCountries = result;
                } else {
                    this.localCountries = this.countries;
                }
            },
            onSubmit() {
                setTimeout(() => {
                    ad.dismissSoftInput();
                }, 150);
            },
            clearSearch() {
                this.searchPhrase = "";
                this.localCountries = this.countries;
            },
            searchbarLoaded() {
                // ad.dismissSoftInput();
            }
        },
        mounted() {
            this.$store.dispatch("stats/getGlobal");
            this.$store.dispatch("stats/getCountries").then((response) => {
                this.localCountries = response.data;
            });
            setInterval(() => {
                this.$store.dispatch("stats/getGlobal");
                this.$store.dispatch("stats/getCountries");
            }, 300000)
        }
    };
</script>

<style scoped lang="scss">
    .page, .layout {
        background-color: #121212;
        /*font-family: 'Open Sans', sans-serif;*/
    }
    .body-wrap {
        background-color: #121212;
        padding: 15px;
        .date {
            padding: 15;
            font-size: 18;
            color: whitesmoke;
            font-family: 'Open Sans', sans-serif;
            font-weight: bold;
        }
    }

    .header {
        color: white;
        border-bottom-color: #949494;
        font-size: 28px;
        font-weight: 600;
        padding: 0 15 0 15;
        margin: 0;
        background: #121212;
        font-family: 'Open Sans', sans-serif;
    }
    TabStrip {
        background: #121212;
        padding: 0;
        margin: 0;
        font-size: 20px;
        selected-item-color: #428cff;
        un-selected-item-color: #949494;
        highlight-color: gold;
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        color: #fff;
    }
    .search {
        font-size: 18px;
        margin-bottom: 20px;
        background-color: whitesmoke;
        color: #333;
    }
</style>