module.exports = {
    async handleErrorAsync(callback, res) {
        try {
            await callback()
        } catch(error) {
            res.status(200).json({ error })
        }
    }
}
