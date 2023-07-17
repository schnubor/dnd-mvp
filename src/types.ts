export type BlockType = 'text' | 'image' | 'section';

export interface Block {
    id: string;
    type: BlockType;
    childBlocks?: Block[];
    origin?: string;
}
