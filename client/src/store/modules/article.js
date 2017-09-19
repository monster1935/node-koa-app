import marked from '@/lib/marked';
export default  {
    state: {
        compileContent: ''
    },
    actions: {

    },
    mutations: {
        SET_CONTENT(state, content) {
            state.compileContent = marked(content);
        }
    }
}
