import type { ColDef } from "ag-grid-community";

export default () => {
    const generateRowDataColumnDefs = ([row]: unknown[] = [], mapper?: Record<string, string>): ColDef[] => {
        if(!row) {
            return [];
        }
        const list = Object.keys(row as Record<string, unknown>)
        .map((key) => {
            return {
                headerName: mapper?.[key] || key,
                field: key,
                autoHeight: true,
            }
        })
        // list의 순서를 mapper 키의 순서대로 정렬
        return list.sort((a, b) => {
            if (!mapper) return 0;
            
            // mapper 객체에 있는 키들의 배열
            const mapperKeys = Object.keys(mapper);
            
            // 각 필드의 매퍼 내 인덱스 찾기
            const aIndex = mapperKeys.indexOf(a.field);
            const bIndex = mapperKeys.indexOf(b.field);
            
            // 매퍼에 없는 필드는 맨 뒤로
            if (aIndex === -1 && bIndex === -1) return 0;
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;
            
            // 인덱스 비교로 순서 결정
            return aIndex - bIndex;
        });
    }
    return {
        generateRowDataColumnDefs,
    }
}