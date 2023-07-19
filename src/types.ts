export type BlockType = 'text' | 'image' | 'section' | 'placeholder';

export interface Block {
    id: string;
    type: BlockType;
    title?: string;
    parent?: string | null;
}
