import * as types from '../actions/types'


const initialState = {
    data: "", errors: "", loading: false, message: ""
}

const generateReceiptReducer = (state = initialState, action) => {

    const { payload, type } = action

    switch (type) {
        case types.GENERATE_RECEIPT:
            return {
                ...state,
                loading: true
            }

        case types.GENERATE_RECEIPT_FAILED:
            return {
                ...state,
                errors: payload.errors,
                data: null,
                message: payload.message,
                loading: false,
            }
        case types.GENERATE_RECEIPT_SUCCESS:
            return {
                ...state,
                data: payload.data.data,
                loading: false,
                message:payload.data.message
            }

        default:
            return state
    }
}

export default generateReceiptReducer
