const catalogStore = {
    namespaced: true,
    state: {
        catalogList: [
            {
                id:0,
                title:'ЖК Хуево Кукуево',
                city:'Москва',
                address:'Москва, ул Пушкина д 228',
                developer: 'ПИК',
                workCount: 50,
                workSquare: '2.444 м3',
                raiting: 9.5,
                thumb: 'https://ionicframework.com/docs/demos/api/card/madison.jpg',
                date: Date.now()
            },
            {
                id:1,
                title:'Сарай VueX',
                city:'Видное',
                address:'Флягино д6п5',
                developer: 'Антон Васильевич',
                workCount: 5,
                workSquare: '143 м3',
                raiting: 3.5,
                thumb: 'https://i.ytimg.com/vi/78KkLYxzwzY/hqdefault.jpg',
                date: Date.now()
            },
            {
                id:2,
                title:'Паркинг',
                city:'Москва',
                address:'Москва, дубнинская 14',
                developer: 'Эталон',
                workCount: 5,
                workSquare: '143 м3',
                raiting: 4.5,
                thumb: 'https://cdn.mskguru.ru/uploads/news/parking-v-novostrojjke-vidyy-i-normyy_l.jpg',
                date: Date.now()
            }                
        ],
        /*  
        searchResultCatalogList -> 
            result: String
            relation: String
        */
        searchResultCatalogList: []
    },
    getters: {
        getCatalogList(state){
            return state.catalogList
        },
        getCatalogListByDeveloper: (state) => (developer) => {
            return state.catalogList.filter(c => c.developer.toLowerCase().indexOf(developer.toLowerCase()) >= 0)
        },
        getCatalogListByTitle: (state) => (title) => {
            return state.catalogList.filter(c => c.title.toLowerCase().indexOf(title.toLowerCase()) >= 0)
        },
        getSearchResult(state){
            return state.searchResultCatalogList
        }
    },
    mutations:{
        setSearchResultCatalogLis(state, list){
            if(list.length > 0){
                state.searchResultCatalogList = list
            }else[
                state.searchResultCatalogList = [{result:'Ничего не найдено', relation:''}]
            ]           
        }
    },
    actions:{
        fetchSearch({commit, getters}, searchText){
            const resultList = []
            const resByDev = getters.getCatalogListByDeveloper(searchText)
            const resByTitle = getters.getCatalogListByTitle(searchText)

            if(resByDev.length > 0){
                resultList.push({
                    result: resByDev[0].developer,
                    relation: 'Застройщик'
                })
            }
            if(resByTitle.length > 0){
                resultList.push({
                    result: resByTitle[0].title,
                    relation: 'По названию'
                })
            }
                commit('setSearchResultCatalogLis', resultList)                   
        }
    }
}
export default catalogStore