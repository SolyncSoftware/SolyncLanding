import source from './terms.md?raw';
import { renderMarkdown } from '$lib/markdown';

export const load = () => renderMarkdown(source);