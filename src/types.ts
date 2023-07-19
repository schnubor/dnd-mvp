export type BlockType = 'text' | 'image' | 'section' | 'button' | 'placeholder';

export interface Block {
    id: string;
    type: BlockType;
    title?: string;
}
