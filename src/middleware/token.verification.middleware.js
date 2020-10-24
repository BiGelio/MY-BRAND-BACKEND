export const verifyUserBeforeDelete = (err) => {
    if (err) {
        return res.status(401).json({ Message: "Please login to delete your account!" })
    }

}
export const verifyUserBeforeUpdate = (err) => {

    if (err) {
        return res.status(401).json({ Message: "Please login to update your data!" })
    }

}
export const verifyUserBeforeGet = (err) => {
    if (err) {
        return res.status(401).json({ Message: "Please login as admin to view all users!" })
    }
}