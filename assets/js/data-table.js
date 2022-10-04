/**
 * @author José Armando HS 😺 @JOSEHS06
 * @description
 * Permite crear tablas paginadas, ordenadas y con búsqueda de información
 * sin cambiar el diseño de tu tabla 🦊.
 * @version v.1.0 
 */

import { createApp, nextTick, onMounted, computed, watch, reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'


const app = createApp({

    setup() {

        const dataTable = reactive({
            data: [], // Arreglo de objetos con la información a mostrar en la tabla
            filters: ['id', 'name', 'gender', 'status'], //Filtros de la tabla
            pageSize: 5, //Cantidad de registros mostrados por página.
            currentPage: 1, //Página Actual
            ascending: false, // Ordenamiento de la tabla
            search: '', // Valor a buscar,
            isLoading: false // Proceso de carga de la tabla
        });

        onMounted(() => getData());

        //Obtener la información a mostrar en la tabla
        const getRows = () => {
            const start = (dataTable.currentPage - 1) * parseInt(dataTable.pageSize);
            const end = start + parseInt(dataTable.pageSize);
            return filteredRows.value.slice(start, end);
        }

        //Navegar entre las páginas
        const goToPage = (val) => {
            let i = (val == 0) ? 1 : (val > pages.value) ? pages.value : val;
            dataTable.currentPage = i;
        }

        //Registros Filtrados
        const filteredRows = computed(() => dataTable.data.filter(item => dataTable.filters.some(key => item[key].toString().toLowerCase().includes(dataTable.search.toLowerCase()))));

        //Número de páginas
        const pages = computed(() => Math.ceil(filteredRows.value.length / dataTable.pageSize));

        watch(pages, () => dataTable.currentPage = 1);


        //Obtener Información de la tabla
        const getData = async () => {

            await fetch('https://rickandmortyapi.com/api/character/?page=1')
                .then(response => response.json())
                .then(data => {
                    dataTable.data = [...data.results];
                });
        }

        return { dataTable, getRows, goToPage, filteredRows, pages }
    }

});


app.mount('#app');
