

import graphlib from 'graphlib';

export default class TransformFlowToActionsService {

    executar(drawflowData: any) {
        const nodes = drawflowData.drawflow.Home.data;
        const actions = [];


        Object.keys(nodes).forEach((nodeId) => {
            const node = nodes[nodeId];
            const action = { type: node.name, options: node.data };

            // Mapeia conexões
            Object.keys(node.outputs || {}).forEach((outputKey) => {
                const connections = node.outputs[outputKey].connections;
                // action.next = connections.map((conn) => conn.node);
            });

            actions.push(action);
        });
    }
}