import { Request, Response } from "express";
import TransformFlowToActionsService from "../services/TransformFlowToActionsService";
import ExecuteActionsService from "../services/ExecuteActionsService";


export default class ProcessFlowController {

    async processFlow(request: Request, response: Response) {

        const drawFlowData = request.body;

        try {
            const action = TransformFlowToActionsService.transform(drawFlowData);

            await ExecuteActionsService.executarFluxo(action);

            return response.status(200).json({ message: "Fluxo processado com sucesso!" });

        } catch (error: any) {
            return response.status(500).json({ message: error.message });
        }



    }
}