import source from './privacy.md?raw';
import { renderMarkdown } from '$lib/markdown';

export const load = () => renderMarkdown(source);