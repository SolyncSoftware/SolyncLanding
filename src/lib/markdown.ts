import { unified, type Plugin } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { parse as parseYaml } from 'yaml';
import type { Root, Yaml } from 'mdast';

export type Frontmatter = {
    title?: string;
    revised?: string;
    [key: string]: unknown;
};

declare module 'vfile' {
    interface DataMap {
        frontmatter: Frontmatter;
    }
}

const extractFrontmatter: Plugin<[], Root> = function () {
    return (tree, file) => {
        const node = tree.children.find((n): n is Yaml => n.type === 'yaml');
        if (node) file.data.frontmatter = parseYaml(node.value) as Frontmatter;
    };
};

const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(extractFrontmatter)
    .use(remarkRehype)
    .use(rehypeStringify);

export async function renderMarkdown(source: string) {
    const file = await processor.process(source);
    return {
        ...(file.data.frontmatter ?? {}),
        html: String(file)
    };
}
