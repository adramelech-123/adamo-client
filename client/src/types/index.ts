export interface FileState {
    file: File | null;
    preview: string | null;
    status: 'idle' | 'selected' | 'uploading' | 'success' | 'error';
    progress: number;
    error: string | null;
}

export interface StructuredData {
    firstname: string;
    surname: string;
    doc_type: string;
    doc_num: string;
    country: string;
    finalized: boolean;
    img: string;
    cropped_img: string;
}