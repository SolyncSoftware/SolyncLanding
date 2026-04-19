import { unified, type Plugin } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { parse as parseYaml } from 'yaml';
import type { Root, Yaml } from 'mdast';
import source from './terms.md?raw';

type Frontmatter = {
    title: string;
    revised: string;
};

declare module 'vfile' {
    interface DataMap {
        frontmatter: Frontmatter;
    }
}

const extractFrontmatter: Plugin<[], Root> = function () {
    return (tree, file) => {
        const node = tree.children.find((n): n is Yaml => n.type === 'yaml');
        if (node) {
            file.data.frontmatter = parseYaml(node.value) as Frontmatter;
        }
    };
};

export const load = async () => {
    const file = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter, ['yaml'])
        .use(extractFrontmatter)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(source);

    const frontmatter = file.data.frontmatter!;

    return {
        title: frontmatter.title,
        revised: frontmatter.revised,
        html: String(file)
    };
};