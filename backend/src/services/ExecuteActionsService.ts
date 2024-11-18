import helps from "../helpers/helps";


class ExecutionActionsService {

    async executar(action: any) {

        switch (action.type) {
            case "start-whatsapp":
                console.log("Selecionado Canal Whatsapp: ", action.options);
                break;
            case "start-manual":
                console.log("Selecionado Canal manual: ", action.options);
                break;
            case "send-message":
                console.log("Enviando mensagem: ", action.options);
                break;
            case "await":

            //TRASNFORMA SEGUNDOS PARA MILISEGUNDOS
                const milisegundos = action.options.time * 1000;
                console.log("Aguardando resposta por: ", milisegundos ," milisegundos");
                await helps.sleep(milisegundos);
                break;
            default:
                throw new Error('Tipo de ação não suportado');
        }

    }

    async executarFluxo(actionFlow: any) {
        await this.executar(actionFlow);
        if (actionFlow.next && actionFlow.next.length > 0) {
            for (const nextAction of actionFlow.next) {
                await this.executarFluxo(nextAction);
            }
        }
    }
}

export default new ExecutionActionsService();