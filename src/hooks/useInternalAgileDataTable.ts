import type { GridApi } from "ag-grid-community";
import { onMounted, ref } from "vue";

export default () => {
    const gridApi = ref<GridApi>()
    const themeStr = 'legacy' as any;
    // 그리드 준비 완료 핸들러
    const onGridReady = (params: any) => {
        gridApi.value = params.api
        params.api?.sizeColumnsToFit()
    }
    onMounted(() => window.addEventListener('resize', onGridReady))
    return {
        themeStr,
        gridApi,
        onGridReady,
    }
}