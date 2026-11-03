class ApiResponse {
    constructor(statusCode = 200, message = "Success", data = null, metadata = null) {
        this.success = true
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.metadata = metadata
    }
}

export default ApiResponse