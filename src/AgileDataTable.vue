<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import { computed } from 'vue'
import useAgileDataTable from './hooks/useAgileDataTable';
import useInternalAgileDataTable from './hooks/useInternalAgileDataTable';
const emit = defineEmits<{
    gridReady: [params: any],
}>();
const {
    attrs,
} = defineProps<{
    attrs: Omit<Parameters<typeof AgGridVue>[0], 'theme'>
}>();

const { themeStr, gridApi, onGridReady } = useInternalAgileDataTable();
const { generateRowDataColumnDefs } = useAgileDataTable();
const defaultColumnDefs = computed(() => {
    const validateRowData = attrs.rowData && attrs.rowData.length > 0 && attrs.rowData?.[0];
    if(attrs.columnDefs || !validateRowData) {
        return [];
    }
    const rowData = attrs.rowData as unknown[];
    return generateRowDataColumnDefs(rowData);
})
defineExpose({ gridApi })
</script>
<template>
    <div class="ag-theme-material pb-20">
        <ag-grid-vue
            v-bind="{
                ...attrs,
                suppressNoRowsOverlay: true,
                gridOptions: {
                    pagination: false,
                    paginationAutoPageSize: false,
                    animateRows: false,
                    rowSelection: 'single' as const,
                    domLayout: 'autoHeight',
                    maxConcurrentDatasourceRequests: 1,
                    infiniteInitialRowCount: 0,
                    maxBlocksInCache: 0,
                    ...attrs.gridOptions,
                },
                theme: themeStr,
                columnDefs: [...defaultColumnDefs, ...(attrs.columnDefs || [])],
            }"
            @grid-ready="(params: any) =>{
                onGridReady(params);
                emit('gridReady', params);
            }"
        />
    </div>
</template>