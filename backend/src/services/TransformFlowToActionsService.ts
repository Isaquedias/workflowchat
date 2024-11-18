import graphlib from 'graphlib';

class TransformFlowToActionsService {
    transform(nodes: any): any {
        const g = new graphlib.Graph();
        const nodeMap: any = {};

        // Adicionar os nós e arestas ao grafo
        Object.keys(nodes.drawflow.Home.data).forEach((nodeId) => {
            const node = nodes.drawflow.Home.data[nodeId];

            // Adicionar o nó ao grafo
            g.setNode(nodeId, {
                type: node.name,
                options: node.data
            });

            // Adicionar as conexões como arestas
            Object.keys(node.outputs).forEach((outputId) => {
                const connections = node.outputs[outputId].connections;
                connections.forEach((conn : any) => {
                    g.setEdge(nodeId, conn.node);
                });
            });
        });

        // Verificar ciclos no grafo
        if (!graphlib.alg.isAcyclic(g)) {
            throw new Error('O fluxo contém ciclos, o que impede a ordenação.');
        }

        // Ordenar os nós em ordem topológica e gerar ações
        const sortedNodes = graphlib.alg.topsort(g);
        sortedNodes.forEach((nodeId) => {
            const nodeData = g.node(nodeId);
            nodeMap[nodeId] = { type: nodeData.type, options: nodeData.options, next: [] };
        });

        // Construir a árvore de ações
        sortedNodes.forEach((nodeId) => {
            const node =nodes.drawflow.Home.data[nodeId];
            Object.keys(node.outputs).forEach((outputId) => {
                const connections = node.outputs[outputId].connections;
                connections.forEach((conn : any) => {
                    nodeMap[nodeId].next.push(nodeMap[conn.node]);
                });
            });
        });

        // Encontrar o nó raiz (sem predecessores)
        const rootNodeId : any= sortedNodes.find((nodeId) => g.inEdges(nodeId)?.length === 0);
        return nodeMap[rootNodeId];
    }
}

export default new TransformFlowToActionsService();