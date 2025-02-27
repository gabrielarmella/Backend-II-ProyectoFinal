import moment from "moment";

export default class TicketDTO {
    fromModel(model) {
        return {
            id: model.id,
            code: model.code,
            amount: model.amount,
            purchase: moment(model.purchase).format("YYYY-MM-DD HH:mm:ss"),
            purchaser: model.purchaser,
        };
    }

    fromData(data) {
        return {
            id: data.id || null,
            amount: Number(data.amount),
            purchaser: data.purchaser,
        };
    }
}